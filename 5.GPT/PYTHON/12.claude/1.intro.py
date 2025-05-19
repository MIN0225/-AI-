# pip install anthropic

import os
import anthropic
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("ANTHROPIC_API_KEY")

# client = openai 했던 것처럼...
client = anthropic.Anthropic(api_key=api_key)

message = client.messages.create(
  model="claude-3-7-sonnet-20250219",
  max_tokens=1000,
  temperature=0.7,
  messages=[
    # {"role": "user", "content": "안년하세요"},
    # {"role": "user", "content": "python으로 flask 만들고 싶어. 가장 간단한 예제 보여줘."},
    # {"role": "user", "content": "GPT란 무엇인지 간단하게 주요 기능 알려줘"},
    {"role": "user", "content": "개발자 주인공 웹툰 스토리 만들어줘."},
  ]
)

print(message.content[0].text)