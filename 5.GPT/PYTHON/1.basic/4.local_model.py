# pip install transformers
# ~/.cache/huggingface 디렉토리 안에 모델들이 다운로드가 됨
# pip install protobuf sentencepiece

from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
from dotenv import load_dotenv

load_dotenv(dotenv_path='../.env')

model_name = "gpt2"

# 모델 불러오기
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name, torch_dtype="auto")

# 파이프라인 생성
generator = pipeline(
  "text-generation", 
  model = model, 
  tokenizer = tokenizer,
  temperature = 0.7,  # 답변의 창의성 (확률 분포로 좀 더 넓은 범위)
  max_new_tokens = 128, # 출력 토큰의 길이
  pad_token_id = tokenizer.eos_token_id,
  do_sample = True,
  top_k = 50, # 확률 분포상 높은 k개만 골라라
  top_p = 0.95, # 선택 확률이 높은 p% 내에서만 골라라
  repetition_penalty = 1.2, # 반복 억제
  no_repeat_ngram_size = 3, # 3단어 이상 반복을 금지
)

# 질문
prompt = "what are good fitness tips?"
outputs = generator(prompt)

print(outputs[0]["generated_text"])