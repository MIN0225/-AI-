import os
import csv

with open("매수종목.csv", "w", encoding="cp949", newline='') as csvfile:
  writer = csv.writer(csvfile)
  writer.writerow(["종목명", "종목코드", "PER"])
  writer.writerow(["삼성전자", "005930", 15.79])
  writer.writerow(["NAVER", "035420", 55.82])