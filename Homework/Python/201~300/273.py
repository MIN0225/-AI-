import random

class Account:
  count = 0

  def __init__(self, name, balance):
    self.name = name
    self.balance = balance
    self.bank = "SC은행"

    num1 = random.randint(0, 999)
    num2 = random.randint(0, 99)
    num3 = random.randint(0, 999999)

    num1 = str(num1).zfill(3)
    num2 = str(num1).zfill(2)
    num3 = str(num1).zfill(6)
    self.account_number = num1 + '-' + num2 + "-" + num3

    Account.count += 1

  @classmethod
  def get_account_num(cls):
    print(cls.count)

kim = Account("김민수", 100)
print(kim.count)
lee = Account("이민수", 100)
print(lee.count)

Account.get_account_num()