a, b, *c = (0, 1, 2, 3, 4, 5)
print(a)
print(b)
print(c)

scores = [8.8, 8.9, 8.7, 9.2, 9.3, 9.7, 9.9, 9.5, 7.8, 9.4]
a, b, c, d, e, f, g, h, *i = scores
print(f"{a} {b} {c} {d} {e} {f} {g} {h} {i}")
*valid_score, _, _ = scores
print(valid_score)