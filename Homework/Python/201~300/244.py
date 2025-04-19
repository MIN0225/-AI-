# https://docs.python.org/3.12/library/datetime.html#strftime-strptime-behavior
import datetime

now = datetime.datetime.now()

print(now.strftime('%a %d %b %Y, %I:%M%p'))
print(now.strftime('%H:%M:%S'))