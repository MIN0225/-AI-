class Stock:
  def __init__(self, naem, code):
    self.name = naem
    self.code = code
  def set_code(self, code):
    self.code = code
a = Stock(None, None)
a.set_code("12345")
print(a.code)