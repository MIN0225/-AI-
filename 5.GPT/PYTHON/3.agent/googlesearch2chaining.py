from dotenv import load_dotenv
from langchain_openai import OpenAI
from langchain_community.agent_toolkits.load_tools import load_tools
from langchain.agents import initialize_agent, AgentType
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnableLambda

load_dotenv()

llm = OpenAI()

tools = load_tools(['google-search'])
agent = initialize_agent(
  tools=tools,
  llm=llm,
  agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
  verbose=True
)

get_weather_chain = RunnableLambda(
  lambda x: {"sentence": agent.invoke({"input": x["input"]})["output"]}
)

translate_prompt = PromptTemplate(
  input_variables=["sentence"],
  template="다음 문장이 영어인 경우 한국어로 번역해줘:\n\n{sentence}"
)

chain = (
  get_weather_chain | translate_prompt | llm | RunnableLambda(lambda x: {"translated": x.strip()})
)

# translate_chain = (
#   translate_prompt
#   | llm
#   | RunnableLambda(lambda x: {"translated": x.strip()})
# )

# full_chain = get_weather_chain | translate_chain

# result = full_chain.invoke({"input": "how's today Seoul city weather?"})
result = chain.invoke({"input": "how's today Seoul city weather?"})
print("번역된 날씨:", result["translated"])