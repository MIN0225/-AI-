user = input("입력: ")
money = {"달러": 1167,
         "엔": 1.096,
         "유로": 1268,
         "위안": 171}
# k = user.split(" ")[0]
# v = user.split(" ")[1]
k, v = user.split()
if v in money.keys():
  print(float(k) * money[v], "원")