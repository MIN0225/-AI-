import os

stock_list = []
with open("매수종목1.txt", "r", encoding="utf-8") as file:
  for line in file:
    stock = line.strip()
    stock_list.append(stock)
print(stock_list)