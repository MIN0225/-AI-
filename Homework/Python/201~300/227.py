def print_mxn(string, num):
  line = int(len(string) / num + 1)
  for i in range(line):
    print(string[i * num: i * num + num])

print_mxn("아이엠어보이유알어걸", 3)