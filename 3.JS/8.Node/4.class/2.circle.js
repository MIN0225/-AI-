class Circle {
  constructor(radius) {
    this._radius = radius;
  }

  // 객체 안의 변수에는 직접 접근이 안 되니깐, 그래서... setter/getter를 통해서 내부 변수를 접근한다
  get diameter() {
    return this._radius * 2;
  }

  set diameter(diameter) {
    this._radius = diameter / 2;
  }
}

const myCircle = new Circle(5); // 초기에 반지름 5짜리 원을 만들었음..
console.log(myCircle.diameter); // 결과: 10

myCircle.diameter = 14; // 이후에 값을 변경함
console.log(myCircle.diameter);