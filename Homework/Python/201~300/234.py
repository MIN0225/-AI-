def pickup_even(list):
  result = []
  for num in list:
    if num % 2 == 0:
      result.append(num)
  return result
print(pickup_even([3, 4, 5, 6, 7, 8]))