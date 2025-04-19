user = input("주민등록번호: ")
first, second = user.split("-")
print(first, second)
first_list = [2, 3, 4, 5, 6, 7]
second_list = [8, 9, 2, 3, 4, 5]
sum = 0
for i in range(len(first)):
  sum += int(first[i]) * first_list[i]
  print(f"first[i] * first_list[i]: {int(first[i])} * {first_list[i]}")
print("sum:", sum)
for i in range(len(second_list)):
  sum += int(second[i]) * second_list[i]
  print(f"second[i] * second_list[i]: {int(second[i])} * {second_list[i]}")
print("sum:", sum)

if 11 - (sum % 11) == int(second[-1]):
  print("유효한 주민등록번호입니다.")
else:
  print("유효하지 않은 주민등록번호입니다.")