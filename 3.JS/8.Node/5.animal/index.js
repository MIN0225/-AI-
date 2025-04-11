const Animal = require('./Animal');
const Dog = require('./Dog');
const Cat = require('./Cat');

const animal = new Animal('dolly');
const aSound = animal.makeSound();
console.log(aSound);

const aDog = new Dog('volt');
const aDogSound = aDog.makeSound();
console.log(aDogSound);

const bDog = new Dog('brown');
const bSound = bDog.makeSound();
console.log(bSound);

const aCat = new Cat('kitty');
const aCatSound = aCat.makeSound();
console.log(aCatSound);