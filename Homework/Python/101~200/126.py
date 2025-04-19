user = input("우편번호: ")
gu = int(user[2:3])
if 0 <= gu <= 2:
  print("강북구")
elif 3 <= gu <= 5:
  print("도봉구")
elif 6 <= gu <= 9:
  print("노원구")