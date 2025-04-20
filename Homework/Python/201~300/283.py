class Car:
  def __init__(self, wheel, price):
    self.wheel = wheel
    self.price = price

class Bicycle(Car):
  def __init__(self, wheel, price):
    self.wheel = wheel
    self.price = price

bicycle = Bicycle(2, 100)
print(bicycle.price)