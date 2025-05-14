# 미션: 랭체인 라이브러리 왕창~
import os
from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_chroma import Chroma
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from langchain_core.output_parsers import StrOutputParser

load_dotenv()

PERSIST_DIR = "./chroma_db"
COLLECTION_NAME = "my-data"
store = None

# 프롬프트 코드
template = """
당신은 문서 기반으로 사용자의 질문에 답변하는 챗봇입니다.
다음 문서를 참고해서 사용자의 질문에 답하시오.

문서:
{context}

질문:
{question}

답변:
"""
prompt = ChatPromptTemplate.from_template(template)

# LLM 설정
llm = ChatOpenAI(model="gpt-4o-mini")

output_parser = StrOutputParser()

def create_vector_db(file_path):
  global store

  loader = PyPDFLoader(file_path)
  pages = loader.load()

  print(f"총 페이지 수: ", len(pages))
  # documents = loader.load()

  text_splitter = CharacterTextSplitter(
    separator="\n\n", # 문서 구분할 단위
    chunk_size=2000, # 최대 2000 토큰
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
    return store
  else:
    store = Chroma.from_documents(
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

  docs = store.similarity_search(question, k=5)
  context = "\n\n".join([doc.page_content for doc in docs])

  chain = prompt | llm | output_parser

  result = chain.invoke({
    "context": context, "question": question
  })

  return f"질문: {question}\n응답: {result}"