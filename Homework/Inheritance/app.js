const Person = require('./Person');
const Student = require('./Student');
const Employee = require('./Employee');

const person = new Person('Peter');
const aStudentGreet = person.greet();
console.log(aStudentGreet);

const aEmployee = new Employee('James', 'Manager');
const aEmployeeGreet = aEmployee.greet();
console.log(aEmployeeGreet);

const bStudent = new Student('Robin', 'Computer Science');
const bStudentGreet = bStudent.greet();
console.log(bStudentGreet);
