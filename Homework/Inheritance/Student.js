const Person = require('./Person');

class Student extends Person{
  constructor(name, major) {
    super(name);
    this.major = major;
  }

  greet() {
    console.log(`내 이름은 ${this.name}이고 전공은 ${this.major}야`);
  }
}

module.exports = Student;