time = input("현재시간: ")
a = time.split(":")
if(a[-1] == '00'):
  print("정각입니다.")
else:
  print("정각이 아닙니다")

# 정답 코드
# time = input("현재시간: ")
# if time[-2:] == "00":
#     print("정각 입니다.")
# else:
#     print("정각이 아닙니다.")