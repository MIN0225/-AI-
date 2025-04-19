import random

class Account:
  count = 0

  def __init__(self, name, balance):
    self.deposit_count = 0
    self.deposit_log = []
    self.withdraw_log = []

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
    if self.deposit_count == 5:
      self.balance *= 1.01

  @classmethod
  def get_account_num(cls):
    print(cls.count)

  def deposit(self, money):
    if money >= 1:
      self.deposit_log.append(money)
      self.balance += money

      self.deposit_count += 1
      if self.deposit_count % 5 == 0:
        self.balance *= 1.01
      

  def withdraw(self, money):
    if self.balance > money:
      self.withdraw_log.append(money)
      self.balance -= money

  def display_info(self):
    print(f"은행이름: {self.bank}")
    print(f"예금주: {self.name}")
    print(f"계좌번호: {self.account_number}")
    print(f"잔고: {self.balance:,}")

  def deposit_history(self):
    for log in self.deposit_log:
      print(log)

  def withdraw_history(self):
    for log in self.withdraw_log:
      print(log)

k = Account("kim", 100000000)
l = Account("lee", 10000)
p = Account("park", 100000000)

k.deposit(123214)
k.deposit(3124)
k.deposit(51214)
k.deposit(93214)
k.deposit_history()

k.withdraw(1)
k.withdraw(232)
k.withdraw(5232)
k.withdraw_history()