def print_5xn(string):
  line = int(len(string) / 5)
  for i in range(line + 1):
    print(string[i * 5: i * 5 + 5])
print_5xn("아이엠어보이유알어걸")