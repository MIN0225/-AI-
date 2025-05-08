from dotenv import load_dotenv
from openai import OpenAI
from langchain_openai import OpenAI

load_dotenv(dotenv_path='../.env')
llm = OpenAI()
print(llm)

prompt = '회사 이름을 작명하고 싶어. 나의 회사는 아케이드 게임을 만드는 회사야.'

result = llm.generate([prompt] * 5)
for data in result.generations:
  print(data[0].text)