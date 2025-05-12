from langchain.agents import initialize_agent, AgentType
from langchain_community.agent_toolkits.load_tools import load_tools
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv

load_dotenv()

llm = ChatOpenAI(model="gpt-4o-mini")

tools = load_tools(["llm-math"], llm=llm)

agent = initialize_agent(
  tools=tools,
  llm=llm,
  agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
  verbose=True
)

# result = agent.invoke("123 * 4412 얼마야?")
# result = agent.invoke("삼각형 높이가 5고, 밑변이 10이면 넓이가 얼마야?")
# result = agent.invoke("세상에서 가장 깊은 해구는?")
question = """
애플의 arm 아키텍처는 기존 pc 보다 부팅속도, 배터리 효율 면에서 월등한 성능을 보인다.
그 원인을 알아보던 길동이는 애플의 m칩 설계에서 그 비법을 발견한다.
애플의 맥북이 저전력 고효율을 달성하게 된 원인은?
"""

result = agent.invoke(question)
print(result["output"])