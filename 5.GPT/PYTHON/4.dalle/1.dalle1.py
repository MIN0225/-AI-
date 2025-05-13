from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI()

# 모델은 dall-e-2 or dall-e-3
# 사이즈 v2: 최대사이즈 1024 x 1024, 보통 512x512, 256x256
#      v3: 최소 사이즈 1024 x 1024
# 품질(v3 only): standard or hd
# 개수: v2: 여러 개 가능, v3: 1개 가능
response = client.images.generate(
  model="dall-e-3",
  # prompt="A cute baby sea otter",
  # prompt="A joyful software developer in their 30s, smiling while working remotely on a laptop at a scenic beachside café in Bali. The developer is wearing casual clothes, surrounded by palm trees, a coconut drink, and a passport on the table. In the background, there’s a beautiful sunset over the ocean and a parked scooter with a backpack. The atmosphere conveys freedom, financial independence, and a sense of global adventure. Realistic style, high detail, cinematic lighting.",
  prompt="A young junior software developer in their 20s, sitting alone at a cozy bar at night, gently smiling while holding a glass of beer. There’s a subtle sense of pride and reflection in their eyes. A laptop bag is resting on the stool next to them, and a framed offer letter is visible in the background on their phone screen. Warm lighting, wood interiors, and soft jazz ambiance surround them. The beer is untouched, symbolizing a meaningful toast after two years of sobriety. Realistic style, emotional tone, cinematic composition.",
  # size="512x512",
  size="1024x1024",
  quality="hd",
  n=1
)

image_url = response.data[0].url
print(image_url)

import urllib
urllib.request.urlretrieve(image_url, "DATA/developer_image.png")