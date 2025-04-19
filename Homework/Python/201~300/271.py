import random

class Account:
  def __init__(self, name, balance):
    self.name = name
    self.balance = balance
    self.bank = "SC은행"
    # number = str(random.randint(100, 999)) + "-" + str(random.randint(10, 99)) + "-" + str(random.randint(100000, 9999999))
    num1 = random.randint(0, 999)
    num2 = random.randint(0, 99)
    num3 = random.randint(0, 999999)

    num1 = str(num1).zfill(3)
    num2 = str(num1).zfill(2)
    num3 = str(num1).zfill(6)
    self.account_number = num1 + '-' + num2 + "-" + num3

a = Account("예금주", 21213)
print(a.bank, a.account_number)