price_list = [32100, 32150, 32000, 32500]
for i in range(1, len(price_list)):
  print(f"{100 + (i - 1) * 10} {price_list[i]}")