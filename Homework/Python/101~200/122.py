user = input("score: ")
score = int(user)
if 81 <= score and score <= 100:
  print("A")
elif 61 <= score and score <= 80:
  print("B")
elif 41 <= score and score <= 60:
  print("C")
elif 21 <= score and score <= 40:
  print("D")
else:
  print("E")