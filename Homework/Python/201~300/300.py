per = ["10.31", "", "8.00"]

for i in per:
    try:
      print(float(i))
    except:
      print("예외 발생")
    else:
      print("예외가 발생하지 않았을 때 출력")
    finally:
      print("예외 발생 여부 상관없이 출력")