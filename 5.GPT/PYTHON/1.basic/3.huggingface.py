# pip install huggingface_hub
from huggingface_hub import InferenceClient

# 가장 일반적으로 범용적으로 쓸 수 있는 언어 모델
# client = InferenceClient(model="mistralai/Mistral-7B-Instruct-v0.3")
client = InferenceClient(model="google/flan-t5-base")
prompt = '너 한국말 할 줄 알아?'
response = client.text_generation(prompt)

print(response)