def print_max(a, b, c):
  max_num = max([a, b, c])
  if a == max_num:
    print(a)
  elif b == max_num:
    print(b)
  else:
    print(c)

print_max(3, 20, 100)