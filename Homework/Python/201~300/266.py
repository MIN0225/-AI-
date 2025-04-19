class Stock:
  def __init__(self, name, code, PER, PBR, profit):
    self.name = name
    self.code = code
    self.PER = PER
    self.PBR = PBR
    self.profit = profit

a = Stock("삼전", "1243213", 10.2, 80.3, 3.4)
print(a.name, a.code, a.PER, a.PBR, a.profit)