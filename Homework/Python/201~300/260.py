class OMG : 
    def print() :
        print("Oh my god")

myStock = OMG()
myStock.print()
# TypeError Traceback (most recent call last)
# TypeError: print() takes 0 positional arguments but 1 was given
# 파이썬에서 클래스 안에 정의된 인스턴스 메서드는 첫 번째 인자로 self를 받아야 한다