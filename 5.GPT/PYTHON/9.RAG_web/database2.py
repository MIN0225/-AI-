# 미션: 랭체인 라이브러리 왕창~
import os
from dotenv import load_dotenv
import json
import yaml

from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_chroma import Chroma
from langchain.text_splitter import CharacterTextSplitter, RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from langchain_core.output_parsers import StrOutputParser

load_dotenv()

PERSIST_DIR = "./chroma_db"
COLLECTION_NAME = "my-data"
store = None
DATA_DIR = './DATA'
PROMPT_FILE = "./prompts.json"

# 프롬프트 코드
def load_prompts_from_json(file_path):
  with open(file_path, "r", encoding="utf-8") as f:
    prompt_data = json.load(f)
    print(prompt_data)
    return {ChatPromptTemplate.from_template(prompt_data["messages"][0]["content"])}

def load_prompts_from_yaml(file_path):
  with open(file_path, "r", encoding="utf-8") as f:
    prompt_data = yaml.safe_load(f)
    print(prompt_data)
    return {ChatPromptTemplate.from_template(prompt_data["messages"][0]["content"])}

prompt = load_prompts_from_json(PROMPT_FILE)

template = """
당신은 오직 주어진 문서 기반으로 사용자의 질문에 답변하는 챗봇입니다.
다음 문서를 참고해서 사용자의 질문에 답하시오.
각각의 문서는 번호와 유사도를 포함하고 있어, 답변을 말할 때 어떤 문서를 참조했는지도 알려주시오.
문서가 없으면 아는 정보 말하지 말고 해당 정보가 없다고 답하시오.

문서:
{context}

질문:
{question}

답변:
"""
prompt = ChatPromptTemplate.from_template(template)

# LLM 설정
llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)

output_parser = StrOutputParser()

def initialize_vector_db():
  global store

  embeddings = OpenAIEmbeddings()

  if os.path.isdir(PERSIST_DIR) and os.listdir(PERSIST_DIR):
    store = Chroma(
      collection_name=COLLECTION_NAME,
      embedding_function=embeddings,
      persist_directory=PERSIST_DIR)
    print("이전 데이터의 로딩이 완료되었습니다.")
    return store


def list_files():
  files = [f for f in os.listdir(DATA_DIR) if os.path.isfile(os.path.join(DATA_DIR, f))]
  print(files)
  return files

def delete_file(file_path):
  # 1. DB에서 삭제한다
  # 컬렉션 맵에서 해당 파일을 파싱하면서 생긴 데이터를 지워야 하는데...
  # metadata에 파일명이 잘 저장되어 있어야함.. (metadata.source)
  result = store._collection.get(where={"source": file_path})
  ids = result.get("ids", [])
  metadatas = result.get("metadatas", [])
  print(f"존재하는 문서 수: {len(ids)} 메타데이터: {metadatas}")

  store._collection.delete(where={"source": file_path})

  # 2. 파일 자체를 삭제한다
  path = os.path.join(DATA_DIR, file_path)
  if os.path.exists(path):
    os.remove(path)



def create_vector_db(file_path):
  global store

  loader = PyPDFLoader(file_path)
  pages = loader.load()

  # 우리의 메타데이터를 추가...  이거 안 해도 파일 불러올 때 메타데이터가 들어감
  for page in pages:
    page.metadata["source"] = os.path.basename(file_path)

  print(f"총 페이지 수: ", len(pages))
  # documents = loader.load()

  text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000, # 최대 1000 토큰
    chunk_overlap=100 # 이전 문서와 중복할 단위
  )

  texts = text_splitter.split_documents(pages)

  embeddings = OpenAIEmbeddings()

  if not os.path.exists(PERSIST_DIR):
    os.makedirs(PERSIST_DIR)
  
  # 폴더도 있고, 파일도 있으면, 불러오기
  if os.path.isdir(PERSIST_DIR) and os.listdir(PERSIST_DIR):
    store = Chroma(
      collection_name=COLLECTION_NAME,
      embedding_function=embeddings,
      persist_directory=PERSIST_DIR)
    
    # 내용 추가
    store.add_documents(texts)
    return store
  else:
    store = Chroma(
      texts,
      embeddings,
      collection_name=COLLECTION_NAME,
      persist_directory=PERSIST_DIR
    )

  return store

def answer_question(question):
  # DB로부터 검색해서... 체인 invoke하는 코드까지...
  if store is None:
    return "문서가 업로드 되지 않았습니다."

  docs_with_score = store.similarity_search_with_score(question, k=5)
  context = "\n\n".join(
    [f"[문서 {i+1}] (score{round((1-score)*100, 2)}%)\n {doc.page_content}"
      for i, (doc, score) in enumerate(docs_with_score)]
  )
  print(docs_with_score)

  chain = prompt | llm | output_parser

  result = chain.invoke({
    "context": context, "question": question
  })

  # 답변 고도화
  source_lines = []
  for doc, score in docs_with_score:
    source = os.path.basename(doc.metadata.get("source", "unknown"))
    page = int(doc.metadata.get("page", 0)) + 1
    score_parent = round((1 - score) * 100, 2) # 대충 유사도 계산
    source_lines.append(f"{source} (page {page}, 유사도 {score_parent}%)")

  return (
    f"질문: {question}\n"
    f"응답: {result}\n"
    f"관련문서: \n" + "\n".join(f" - {line}" for line in source_lines)
    )