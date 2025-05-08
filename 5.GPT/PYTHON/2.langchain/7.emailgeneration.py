# 주식 같은 서비스에서 하기 좋음
from langchain_core.prompts import PromptTemplate
from langchain_openai import OpenAI
from dotenv import load_dotenv

from langchain_core.runnables import RunnableLambda

load_dotenv()

template = "회사의 공식 이메일을 작성하고자 합니다. 수신자{recipient}에게 다음 주제 {topic}에 대한 미팅을 요청하는 메일입니다.\n\n"

example_input = {
  "recipient": "개발팀",
  "topic": "신규 서비스 런칭"
}
prompt = PromptTemplate(input_variables=example_input, template=template)
llm = OpenAI(
  temperature=0.6, # 쿼리문 만들 때는 창의력 발휘하지 않고 정확하게
  max_tokens = 1000,
  ) 

chain = prompt | llm | RunnableLambda(lambda x : {"email": x.strip()})

result = chain.invoke(example_input)

print("생성된 이메일:")
print(result["email"])

recipients = [
  "개발팀",
  "마케팅팀",
  "인사팀",
  "총무팀",
  "제무팀",
]

topics = [
  "너희의 많은 버그로 인한 사용자 불만",
  "버그로 줄어드는 사용자를 다시 붙잡기 위한 전략",
  "버그를 만드는 개발자를 해고하기 위한 전략",
  "해고 이후, 직원들의 동기부여를 위한 다과파티",
  "주주들에게 보내는 서한",
  "해고통보메일"
]

for recipient in recipients:
  for topic in topics:
    print(f"\nTo: {recipient} | Topic: {topic}")
