# https://sports.news.naver.com/index

# 미션1. 뉴스의 타이틀(제목) 만 가져와서 출력한다
# 미션2. 해당 뉴스의 원본 URL을 가져온다 (그래서, 그 URL을 클릭했을 때 그 사이트로 이동할 수 있게)

from bs4 import BeautifulSoup
import requests

url = 'https://sports.news.naver.com/index'
response = requests.get(url).text
soup = BeautifulSoup(response, 'html.parser')

link_today = soup.select('.link_today')
# print(link_today)

for item in link_today:
  link = item['href']
  title = item['title']
  news = requests.get(link).text
  newsParse = BeautifulSoup(news, 'html.parser')
  # print('news:', news)
  # print(newsParse)
  # print(newsParse.find_all('div', class_='_article_content'))
  # print(newsParse.find('body'))

  print(f"제목: {title}\n링크: {link}")

# 미션 3. 해당 뉴스 기사 페이지의 상세 내용도 가져오기 
# 미션 3-2.(앞에 100글자만 화면에 출력하기)
# 미션 3-3. 내가 짠 코드가 구조가 좋은지 살펴보기 (함수화가 잘 되어 있느냐)
# 미션 4. 네이버 스포츠 뉴스, 스크롤 아래로 내리다보면, "추천뉴스" 섹션이 있음.
# 미션 4-1. 왜 이건 대체 안 될까?
# 미션 3 지금은 안 됨


url2 = 'https://m.sports.naver.com/wbaseball/article/410/0001062615'

response = requests.get(url2).text
# print(response)
soup2 = BeautifulSoup(response, 'html.parser')
# print(soup2)