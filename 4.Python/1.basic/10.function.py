def greet(name):
  print(f"Hello, {name}!")
  # 리턴값은 없는 것임

greet("Alice")

def add(x, y):
  return x + y
  # 리턴이 있는 것

result = add(2, 3)
print(result)

# 함수 인자의 기본값
def greet_default(name="Guest"):
  print(f"Hello, {name}!")

greet_default()
greet_default("John")

# 함수 인자 위치 지정도 가능함
def example(a, b, c):
  print(f"a: {a}, b:{b}, c:{c}")

example(1, 2, 3)
example(a=1, b=2, c=3)
example(a=1, c=3, b=2)

def print_gugudan(dan):
  print(f"{dan}단")
  for i in range(1, 10):
    print(f'{dan} x {i} = {dan * i}')

#print_gugudan(3)

# 미션. 구구단을 다 출력하시오 2~9단까지
for i in range(2, 10):
  print_gugudan(i)

print('-' * 50)