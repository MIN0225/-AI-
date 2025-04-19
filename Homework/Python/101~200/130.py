import requests
btc = requests.get("https://api.bithumb.com/public/ticker/").json()['data']
opening = float(btc['opening_price'])
max_price = float(btc['max_price'])
min_price = float(btc['min_price'])
if (opening + (max_price - min_price)) > max_price:
  print("상승장")
else:
  print("하락장")