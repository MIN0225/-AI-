from bs4 import BeautifulSoup

html_doc = """
<html>
<head>
  <title>간단한 HTML 예제</title>
</head>
<body>
  <h1>안녕하세요</h1>
  <p>이것은 간단한 HTML 예제입니다.</p>
</body>
</html>
"""

soup = BeautifulSoup(html_doc, 'html.parser')
print(soup) # 출력하면 문자열로 보이지만 사실 parsing한 DOM이다. (눈으로 구별 불가)
print('html_doc.title 이건 불가', html_doc.title)
print(soup.title)
print(soup.h1)
print(soup.h1.text)
print(soup.p)
print(soup.p.text)