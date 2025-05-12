from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.agents import load_tools, initialize_agent, AgentType

load_dotenv()

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.3) # 일반적으로 0.7 그래서 0.2~1.0 사이로

tools = load_tools(["arxiv"]) # 많은 외부 서비스는 대부분 API 키를 필요로 함.. (위키피디아, arXiv는 키없이 가능)

agent = initialize_agent(
  tools = tools,
  llm = llm,
  agent = AgentType.ZERO_SHOT_REACT_DESCRIPTION,
  verbose = True # 생각 출력해주기.. 프로덕션에서는 꺼야함.
)

result = agent.invoke({"input": "최근 프롬프트 엔지니어링 논문을 찾아서 요약해줘."})
print(result["output"])