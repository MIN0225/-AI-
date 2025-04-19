user = input("주민등록번호: ")
gender = int(user[7])
print(gender)
if gender == 1 or gender == 3:
  print("남자")
elif gender == 2 or gender == 4:
  print("여자")