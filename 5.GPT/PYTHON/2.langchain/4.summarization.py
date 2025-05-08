from langchain_core.prompts import PromptTemplate
from langchain_openai import OpenAI
from dotenv import load_dotenv

from langchain_core.runnables import RunnableLambda

load_dotenv()

# 원샷 러닝
template = "다음의 글을 3문장으로 요약하시오: \n예) 하나.\n둘.\n셋\n \n\n{article}"
prompt = PromptTemplate(input_variables=["article"], template=template)
llm = OpenAI(temperature=0.5) # 요약이 목적이니 정확하게...

chain = prompt | llm | RunnableLambda(lambda x: {"summary": x.strip()})

input_text = {
  "article": """
🌸《솜사탕 고양이와 딸기 우체국》🌸

딸기 마을에는 아주 작고 귀여운 우체국이 있어요.
우체국은 딸기잼 냄새가 나는 분홍 지붕을 가지고 있죠.
그리고 그 우체국엔 세상에서 제일 푹신한 직원,
솜사탕 고양이 ‘모모’가 살고 있어요.

모모는 아침마다 포근한 모포를 뒤집어쓰고 하품을 해요.
“냐아~ 오늘은 몇 통의 편지가 올까?”

그날 모모는 우체통에서 반짝이는 편지 한 통을 발견했어요.
봉투에는 이렇게 쓰여 있었어요.

🐭 To. 치즈 마을의 햄찌에게
From. 딸기 마을의 비밀 친구

모모는 궁금했어요.
“비밀 친구? 누구지? 너무 궁금하니까… 일단 햄찌한테 전해줘야지!”

모모는 둥근 꼬리를 팔랑팔랑 흔들며 여행을 떠났어요.
가는 길마다 꽃들이 인사했고, 도토리 다람쥐가 “안녕, 모모~” 하고 외쳤어요.

치즈 마을에 도착했을 때, 햄찌는 노란 치즈 바위에서 낮잠 중이었어요.
모모는 살금살금 다가가 조심스럽게 편지를 놓고 왔죠.
그리고 멀리서 바라봤어요.

햄찌가 편지를 읽고는 두 볼을 발그레하게 붉혔어요.
“우와… 나한테 비밀 친구가 있었다니… 고마워, 모모!”

그날 밤, 모모는 딸기잎 이불을 덮고 누우며 생각했어요.

“편지는, 마음을 따뜻하게 만들지. 딸기잼보다 더 달콤하니까.”
"""
}

result = chain.invoke(input_text)

print(f"요약결과: {result['summary']}")