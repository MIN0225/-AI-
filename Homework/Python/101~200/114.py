num = input("입력값: ")
if(int(num) + 20 > 255):
  print("출력값: 255")
else:
  print(f"출력값: {int(num) + 20}")