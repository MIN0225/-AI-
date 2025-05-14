from dotenv import load_dotenv
from uuid import uuid4

from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables.history import RunnableWithMessageHistory

load_dotenv()

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.1)

# 우리의 대화를 저장할 공간
memory = ChatMessageHistory()

prompt = ChatPromptTemplate.from_messages([ # 신 버전 방식
  ("system", "You are a helpful assistant."), # {"role": "system", "content": "message"} 이거랑 같음
  MessagesPlaceholder(variable_name="history"), # 대화 기록 전달을 위한 공간
  ("human", "{input}")
])

chain = prompt | llm | StrOutputParser()

session_id = str(uuid4())

# 세션별 대화 기록 저장서
store = {} # key value 형식으로 세션 들어갈 것

def get_session_history(session_id):
  if session_id not in store:
    store[session_id] = ChatMessageHistory()
  return store[session_id]

chain_with_memory = RunnableWithMessageHistory(
  chain,
  lambda session_id: get_session_history(session_id), # get_session_history_func 이게 들어가는 곳인데, 일단 세션을 구분 안 할것임.
  input_messages_key="input",
  history_messages_key="history"
)

print(chain_with_memory.invoke({"input":"안녕"}, config={"configurable": {"session_id":"session_id1"}}))
print(chain_with_memory.invoke({"input":"우리 무슨 이야기를 할까?"}, config={"configurable": {"session_id":"session_id2"}}))
print(chain_with_memory.invoke({"input":"난 스포츠에 대한 이야기를 하고 싶어"}, config={"configurable": {"session_id":"session_id1"}}))
print(chain_with_memory.invoke({"input":"근데, 우리 무슨 이야기 하고 있었지?"}, config={"configurable": {"session_id":"session_id2"}}))