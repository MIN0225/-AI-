user = input("주민등록번호: ")
location = int(user[8:10])
if 0 <= location <= 8:
  print("서울입니다.")
else:
  print("서울이 아닙니다.")