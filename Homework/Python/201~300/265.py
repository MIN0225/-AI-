class Stock:
  def __init__(self, naem, code):
    self.name = naem
    self.code = code
  
  def set_code(self, code):
    self.code = code
  
  def get_name(self):
    return self.name
  
  def get_code(self):
    return self.code

삼성 = Stock("삼성전자", "005930")
print(삼성.name, 삼성.code)
print(삼성.get_name())
print(삼성.get_code())