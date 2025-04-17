with open('example.txt', 'w') as file:
  file.write('Hello, World!\n')
  file.write("여기에 기록중\n")
  file.write('---끝===')

print('파일을 다 썼음')

# 파일 읽기
with open('example.txt', 'r') as file:
  for line in file:
    print(line, end='')
