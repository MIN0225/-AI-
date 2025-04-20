class Car:
  def __init__(self, wheel, price):
    self.wheel = wheel
    self.price = price
  
  def information(self):
    print(f"바퀴수 {self.wheel}")
    print(f"가격 {self.price}")

class AutoCar(Car):
  def __init__(self, wheel, price):
    super().__init__(wheel, price)
  
  def information(self):
    print(f"바퀴수 {self.wheel}")
    print(f"가격 {self.price}")

class Bicycle(Car):
  def __init__(self, wheel, price, engine):
    super().__init__(wheel, price)
    self.engine = engine

bicycle = Bicycle(2, 100, "시마노")
bicycle.information()