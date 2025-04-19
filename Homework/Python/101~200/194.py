data = [
    [ 2000,  3050,  2050,  1980],
    [ 7500,  2050,  2050,  1980],
    [15450, 15050, 15550, 14900]
]
result = []
index = 0
for row in data:
  result.append([])
  for col in row:
    result[index].append(col *1.00014)
  index+=1
print(result)