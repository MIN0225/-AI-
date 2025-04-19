ohlc = [["open", "high", "low", "close"],
        [100, 110, 70, 100],
        [200, 210, 180, 190],
        [300, 310, 300, 310]]
# for i in range(1, len(ohlc)):
for row in ohlc[1:]:
  print(row[3])