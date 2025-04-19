class Human:
  def __init__(self, name, age, gender):
    self.name = name
    self.age = age
    self.gender = gender

  def setInfo(self, name, age, gender):
    self.name = name
    self.age = age
    self.gender = gender

areum = Human("아름", 25, "여자")
areum.setInfo("조석", 33, "남자")

print(areum.name, areum.age, areum.gender)