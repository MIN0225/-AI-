# https://pythonscraping.com/pages/page3.html

# 미션1. 해당 페이지에 요청한다
# 미션2. 해당 페이지를 파싱해서 상품명과 가격을 출력한다.

from bs4 import BeautifulSoup
import requests

url = 'https://pythonscraping.com/pages/page3.html'

html_doc = requests.get(url).text

soup = BeautifulSoup(html_doc, 'html.parser')
# print(soup)

items = soup.select('.gift')
# print(len(items))

for item_td in items:
  print("item_td['td'][0].text(상품명):", item_td.select('td')[0].text.strip())
  print("item_td['td'][2].text(가격):", item_td.select('td')[2].text.strip())

table = soup.select_one('#giftList > tr')
print(len(table))

for tr in table:
  tds = tr.select('td')
  print(tr)
  if(len(tds) > 0):
    title = tds[0].text.strip()
    price = tds[2].text.strip()

    print(f"상품명: {title:30} 가격: {price: 20}")