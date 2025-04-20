class Car:
  def __init__(self, wheel, price):
    self.wheel = wheel
    self.price = price

class Bicycle(Car):
  def __init__(self, wheel, price, engine):
    self.wheel = wheel
    self.price = price
    self.engine = engine

bicycle = Bicycle(2, 100, "시마노")
print(bicycle.engine)