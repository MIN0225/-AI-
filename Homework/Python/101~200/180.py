low_prices  = [100, 200, 400, 800, 1000]
high_prices = [150, 300, 430, 880, 1000]
volatility = []
for i in range(len(low_prices)):
  volatility.append(int(high_prices[i]) - int(low_prices[i]))
print(volatility)