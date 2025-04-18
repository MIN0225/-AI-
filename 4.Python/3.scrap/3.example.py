import requests

url = 'https://example.com'

response = requests.get(url)
data = response.text

# 이 결과는 무슨 포멧인가?? 자료구조로 볼 때
# html이 아니고 문자열 string이다
print(data)
