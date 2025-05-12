from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate
from langchain_openai import ChatOpenAI
from langchain.agents import load_tools, initialize_agent, AgentType
from langchain_core.runnables import RunnableLambda

load_dotenv()

llm_summary = ChatOpenAI(model="gpt-4o-mini", temperature=0.3)
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.3) # 일반적으로 0.7 그래서 0.2~1.0 사이로

tools = load_tools(["arxiv"]) # 많은 외부 서비스는 대부분 API 키를 필요로 함.. (위키피디아, arXiv는 키없이 가능)

agent = initialize_agent(
  tools = tools,
  llm = llm_summary,
  agent = AgentType.ZERO_SHOT_REACT_DESCRIPTION,
  verbose = True # 생각 출력해주기.. 프로덕션에서는 꺼야함.
)

# 번역 체인 만든다
# 1. 프롬프트 작성
prompt = ChatPromptTemplate.from_template(
  "너는 전문 번역가야. 다음 문장을 한글로 번역해줘:\n\n {text}"
)

# 2. 체이닝
chain = prompt | llm_summary | RunnableLambda(lambda x: {"korean": x.content.strip()})

# 검색 시킨 것
result = agent.invoke({"input": "최근 프롬프트 엔지니어링 논문을 찾아서 요약해줘."})
# print(result["output"])

# 3. 체이닝을 실행(invoke)
# translation = chain.invoke(result["output"])
translated_result = chain.invoke({"text": result["output"]})

# 4. 결과 출력
print("원문 요약:\n", result["output"])
print("\n한글 번역:\n", translated_result["korean"])