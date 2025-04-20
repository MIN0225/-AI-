import os

data = {}

with open("매수종목2.txt", "r", encoding="utf-8") as file:
  for line in file:
    line = line.strip()
    k, v = line.split()
    data[k] = v
print(data)