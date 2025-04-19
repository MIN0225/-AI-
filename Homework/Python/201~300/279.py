import random

class Account:
  count = 0
  deposit_num = 0

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
    if Account.deposit_num == 5:
      self.balance *= 1.01

  @classmethod
  def get_account_num(cls):
    print(cls.count)

  def deposit(self, money):
    if money >= 1:
      self.balance += money

      self.deposit_num += 1
      if self.deposit_num == 5:
        self.balance *= 1.01

  def withdraw(self, money):
    if self.balance > money:
      self.balance -= money

  def display_info(self):
    print(f"은행이름: {self.bank}")
    print(f"예금주: {self.name}")
    print(f"계좌번호: {self.account_number}")
    print(f"잔고: {self.balance:,}")

k = Account("kim", 100000000)
l = Account("lee", 10000)
p = Account("park", 100000000)
list = []
list.append(k)
list.append(l)
list.append(p)

for customer in list:
  if customer.balance >= 1000000:
    print(customer.display_info())