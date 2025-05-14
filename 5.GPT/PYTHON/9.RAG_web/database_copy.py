# 미션: 랭체인 라이브러리 왕창~
import os
from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter, CharacterTextSplitter
from langchain_community.document_loaders import TextLoader, PyPDFLoader
from langchain_core.runnables import RunnablePassthrough
from langchain_core.documents import Document

load_dotenv()

PERSIST_DIR = "./chroma_db"
retriever = None
chain = None

# 프롬프트 코드
template = """
다음 내용을 참고해서 사용자의 질문에 답변하시오:
{context}

만약, 정보가 없으면 모른다고 답변해줘. 정보가 있으면, 정보를 가져온 출처를 알려줘.
질문: {question}

답변을 작성하고 마지막에 "출처: " 라고 해서 문서의 출처를 명시해줘.
"""
prompt = ChatPromptTemplate.from_template(template)

# LLM 설정
llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)

def create_vector_db(file_path):
  # 여기 내용을 채워 넣으시오...
  global retriever, chain
  #1. 문서 읽기
  loader = PyPDFLoader(file_path)
  # loader = TextLoader(file_path, encoding='cp949')
  pages = loader.load()

  print(f"총 페이지 수: ", len(pages))
  # documents = loader.load()

  for doc in pages:
    doc.metadata["source"] = os.path.basename(file_path) # 파일명 추가
    if "page" not in doc.metadata:
      doc.metadata["page"] = doc.metadata.get("page", 0) + 1

    text_splitter = CharacterTextSplitter(
      separator="\n\n", # 문서 구분할 단위
      chunk_size=2000, # 최대 2000 토큰
      chunk_overlap=200 # 이전 문서와 중복할 단위
    )

  texts = text_splitter.split_documents(pages)

  embeddings = OpenAIEmbeddings()

  store = Chroma.from_documents(
    texts,
    embeddings,
    collection_name="doc",
    persist_directory=PERSIST_DIR)
  
  store.persist()  # 저장 필수!
  retriever = store.as_retriever()
  chain = (
      {"context": retriever, "question": RunnablePassthrough()}
      | prompt
      | llm
  )

  return store

def answer_question(question):
  # DB로부터 검색해서... 체인 invoke하는 코드까지...
  global chain
  if not chain:
    return "문서가 업로드 되지 않음"
  result = chain.invoke(question)

  if "출처:" in result.content:
    answer, sources = result.content.split("출처:", 1)
  else:
    answer = result.content.strip()
    sources = "출처 정보를 찾을 수 없습니다."

  # return f"질문: {question}\n응답: {result}"
  return f"{answer.strip()}\n\n출처: {sources.strip()}"
