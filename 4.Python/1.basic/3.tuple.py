# 튜플
# 리스트는 [] 대괄호, 튜플은 () 소괄호, 딕셔너리는 {} 중괄호
my_tuple = (1, 2, 3, 4, 5)
print(len(my_tuple))
print(my_tuple[0])
print(my_tuple[3])

tuple2 = (1, 2, 3)
print(my_tuple + tuple2)

# 튜플 언패킹(unpacking): 요소를 분할해서 가져오는 것
a, b, c, d, e = my_tuple
print(a, b, c, d, e)

def add(a, b):
  return a + b

print("합산: ", add(2, 3))

def get_stats(number):
  return min(number), max(number), sum(number) / len(number)

stats = get_stats(my_tuple)
print(stats)
