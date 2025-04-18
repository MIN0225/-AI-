# pip install selenium
# pip install webdriver_manager
# https://googlechromelabs.github.io/chrome-for-testing/

from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup

import time

options = Options()
options.add_argument('--headless')

driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=options)
driver.get('https://www.naver.com')

search_box = driver.find_element(By.NAME, 'query')
search_box.send_keys("Python programming")
search_box.submit() # 제출해라

time.sleep(1)
# driver.save_screenshot('search_results.png')
html = driver.page_source # 드라이버로부터, 본인이 보고 있는 페이지를 달라고 한다
driver.quit()

# BS4로 전달해서 파싱 
soup = BeautifulSoup(html, 'html.parser')

# element = driver.find_element(By.CSS_SELECTOR, '.list_area')
list_area = soup.select('.list_area')
# print(list_area)

my_book_list = []

if len(list_area) > 1:
  book_items = list_area[1].select('li.item')

  for book in book_items:
    title_tag = book.select_one('.item_title')
    if title_tag:
      title = title_tag.text.strip()
      link = title_tag['href']
      my_book_list.append([title, link])
  for book in my_book_list:
    print(book)
else:
  print("책 리스트 못 찾음")