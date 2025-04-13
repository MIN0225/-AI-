const Parent = require('./Parent');

class Child extends Parent {
  constructor (name, age, gender, grade){
    super(name, age, gender);
    this.grade = grade;
  }
  
  getInCar(car) {
    super.getInCar(car);
  }

  playInCar() {
    console.log(`${this.name}이(가) 차 안에서 장난을 치고 있습니다.`);
  }
}

module.exports = Child;