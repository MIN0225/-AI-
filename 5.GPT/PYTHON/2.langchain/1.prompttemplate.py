from langchain_core.prompts import PromptTemplate

# 회사 이름을 작명하고 싶어. 게임 만드는 회사야.
# 회사 이름을 작명하고 싶어. 스포츠 장비 만드는 회사야.

template = '회사 이름을 작명하고 싶어. {product} 만드는 회사야.'
prompt = PromptTemplate(
  input_variables=["product"],
  template = template
)

final_prompt = prompt.format(product = "턴제 게임")

print("최종 프롬프트 결과: ")
print(final_prompt)

print('-' * 50)

test_products = [
  "모바일 게임",
  "로봇 장난감",
  "인터넷 전자상거래",
  "수능 문제집"
]

for product in test_products:
  result = prompt.format(product = product)
  print(f"[{product}] {result}\n")
