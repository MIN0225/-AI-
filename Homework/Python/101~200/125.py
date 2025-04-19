dict = {"011": "SKT",
        "016": "KT",
        "019": "LGU",
        "010": "알 수 없음"}
user = input("휴대전화 번호 입력: ")
num = user.split("-")[0]
print(f"당신은 {dict[num]} 사용자입니다.")