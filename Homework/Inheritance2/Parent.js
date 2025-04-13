const Person = require('./Person');

class Parent extends Person{
  constructor(name, age, gender, job) {
    super(name, age, gender);
    this.job = job;
  }

  getInCar(car) {
    this.car = car;
    console.log(car);
    console.log(`${this.name}이(가) ${car.brand} ${car.model}에 탑승했습니다.`);
  }

  driveCar(car) {
    console.log(`${this.name}이(가) ${car.brand} ${car.model}를 운전하고 있습니다.`);
  }
}

module.exports = Parent;