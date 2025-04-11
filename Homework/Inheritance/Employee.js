const Person = require('./Person');


class Employee extends Person {
  constructor(name, jobTitle) {
    super(name);
    this.jobTitle = jobTitle;
  }

  greet() {
    console.log(`내 이름은 ${this.name}입니다. 직급은 ${this.jobTitle}입니다.`);
  }
}

module.exports = Employee;