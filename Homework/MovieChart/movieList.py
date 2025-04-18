# 1. 제목, 이미지경로, 상세페이지링크
# 2. 로컬 내 pc에 이미지 저장하기
# 3. 상세페이지 링크를 타고 들어가서 시놉시스(줄거리) 가져오기
# 4. csv에 저장하기 및 Json으로도 저장해보기

from bs4 import BeautifulSoup
import requests
import os
import csv
import json

url = 'https://www.moviechart.co.kr/rank/realtime/index/image'
response = requests.get(url).text
soup = BeautifulSoup(response, 'html.parser')

movieBox_list = soup.select_one('.movieBox-list')
a_tags = movieBox_list.select('a > img')
movieDict = {} # {제목: [이미지 경로, 상세 페이지 경로, 시놉시스]}

for img in a_tags:
  title = img.get('alt')
  src = img.get('src')
  imageUrl = src.split("source=")[-1]
  movieDict[title] = [imageUrl]

movie_title = soup.select('.movie-title')

for movie in movie_title:
  a_tag = movie.select_one('a')
  href = a_tag.get('href')
  link = 'https://www.moviechart.co.kr/' + href
  title = a_tag.text
  movieDict[title].append(link)

  response2 = requests.get(link).text # Response 객체를 text로 
  soup2 = BeautifulSoup(response2, 'html.parser') # text를 html로
  synopsis = soup2.select_one('.text').text.strip() # html에서 .text태그를 텍스트로
  movieDict[title].append(synopsis)

# 로컬 내 pc에 이미지 저장하기
image_folder = "movie_images"
os.makedirs(image_folder, exist_ok = True)

for title, (img_url, _) in movieDict.items():
  response = requests.get(img_url)
  file_path = os.path.join(image_folder, f'{title}.jpg') # 경로를 os에 맞게 연결
  with open(file_path, 'wb') as f: # 'wb' write + binary 이미지는 텍스트가 아니라 바이너리 데이터
    f.write(response.content)

# csv로 저장
with open('movie_list.csv', mode='w', encoding='utf-8-sig') as file:
  writer = csv.writer(file)
  writer.writerow(['제목', '이미지 경로', '상세 페이지 경로', '시놉시스']) # 헤더 작성
  
  for title, (img_url, detail_url, synopsis) in movieDict.items():
    writer.writerow([title, img_url, detail_url, synopsis])

# json으로 저장
with open('movie_list.json', 'w', encoding='utf-8-sig') as json_file:
  json.dump(movieDict, json_file, ensure_ascii=False, indent=2)