class Human:
  def __init__(self, name, age, gender):
    self.name = name
    self.age = age
    self.gender = gender

  def setInfo(self, name, age, gender):
    self.name = name
    self.age = age
    self.gender = gender

  def __del__(self):
    print("나의 죽음을 알리지 마라")

areum = Human("아름", 25, "여자")
areum.setInfo("조석", 33, "남자")

print(areum.name, areum.age, areum.gender)
del(areum)