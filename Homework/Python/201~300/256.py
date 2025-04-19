class Human:
  def __init__(self, name, age, gender):
    self.name = name
    self.age = age
    self.gender = gender
areum = Human("아름", 25, "여자")
print(f"이름: {areum.name}, 나이: {areum.age}, 성별: {areum.gender}")