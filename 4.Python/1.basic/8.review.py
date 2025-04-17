# 리스트 컴프리헨션
# [표현식 for 항목 in 리스트객체 if 조건문]

# 1부터 10까지의 숫자 리스트를 만드시오
nums = [x for x in range(1, 11)]
print("1번 결과: ", nums)

# 1부터 20까지 짝수들로 이루어진 리스트를 만드시오
even_numbers = [x for x in range(1, 21) if x % 2 == 0]
print("2번 결과: ", even_numbers)

# 각 문자열을 분리하여 대문자로 변환된 리스트를 만드시오
word = "hello" # 기대 결과는 ['H', 'E', 'L', 'L', 'O']
upper_letters = [x.upper() for x in word]
print("3번 결과: ", upper_letters)

# 글자의 길이가 3글자 이하인 단어만 남기시오
words = ["apple", "banana", "cherry", "egg", "grape"]
short_words = [x for x in words if len(x) <= 3]
print("4번 결과: ", short_words)