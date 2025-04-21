import requests
from bs4 import BeautifulSoup
import csv # csv로 저장하고 싶을 때
import json # json으로 저장하고 싶을 때
# import openpyxl # 엑셀로 저장하고 싶을 때

URL = 'https://www.moviechart.co.kr/rank/realtime/index/image'
headers = {
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36"
}

# HTTP 요청하기
response = requests.get(URL, headers=headers)
# if(response.status_code == 200):
#   print("성공")
response.raise_for_status() # 오류 발생 시 예외 발생
soup = BeautifulSoup(response.text, 'html.parser')

# 결과를 저장할 리스트
movies = []
movies_json = []

# 미션. 영화 랭킹을 가져오세요
# 제목, 이미지 URL, 상세페이지 링크
movie_cards = soup.select('div.movieBox li.movieBox-item')
print(len(movie_cards))

for card in movie_cards:
  title_tag = card.select_one('div.movie-title h3')
  img_tag = card.select_one('img')
  link_tag = card.select_one('a')

  title = title_tag.text.strip() if title_tag else "제목 없음"
  image_url = img_tag['src'] if img_tag and img_tag.has_attr('src') else "이미지 없음"
  detail_link = 'https://www.moviechart.co.kr/' + link_tag['href'] if link_tag else "링크 없음"


  # print(f"제목: {title} 이미지: {image_url} 상세페이지: {detail_link}")

  movies.append([title, image_url, detail_link])

  # JSON은 일반 리스트로 저장할 수 없음 그래서 Dict로 저장해야 함
  movies_json.append({
    "title": title,
    "image_url": image_url,
    "detail_link": detail_link
  })

# CSV 파일로 저장
csv_filename = 'movie_chart.csv'
with open(csv_filename, 'w', newline='', encoding='utf-8') as f:
  writer = csv.writer(f)
  writer.writerow(['제목', '이미지URL', '상세링크'])
  writer.writerows(movies)


# json 파일로 저장
json_filename = 'movie_chart.json'
with open(json_filename, 'w', encoding='utf-8') as f:
  json.dump(movies_json, f, ensure_ascii=False, indent=4)

  print(f"JSON 파일로 저장:", json_filename)
