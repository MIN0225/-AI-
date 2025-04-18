import os
import sys
import urllib.request
import json

client_id = os.getenv("NAVER_CLIENT_ID")
client_secret = open('secret.txt', 'r').read()
encText = urllib.parse.quote("맛집")
url = "https://openapi.naver.com/v1/search/blog?query=" + encText + "&display=10" + "&sort=date" # JSON 결과
# url = "https://openapi.naver.com/v1/search/blog.xml?query=" + encText # XML 결과
request = urllib.request.Request(url)
request.add_header("X-Naver-Client-Id",client_id)
request.add_header("X-Naver-Client-Secret",client_secret)
response = urllib.request.urlopen(request)
rescode = response.getcode()


if(rescode==200):
    response_body = response.read()
    # print(response_body.decode('utf-8'))
else:
    print("Error Code:" + rescode)

items = response_body.decode('utf-8')

item_json = json.loads(items)
# print(item_json)

for item in item_json["items"]:
    print(item['title'], item['link'])