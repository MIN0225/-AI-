class Car:
  def __init__(self, wheel, price):
    self.wheel = wheel
    self.price = price

class AutoCar(Car):
  def __init__(self, wheel, price):
    super().__init__(wheel, price)
  
  def information(self):
    print(f"바퀴수 {self.wheel}")
    print(f"가격 {self.price}")

car = AutoCar(4, 1000)
car.information()