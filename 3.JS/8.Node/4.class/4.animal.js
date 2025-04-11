class Animal {
  constructor(name) {
    this.name = name;
  }

  makeSound() {
    return '왈왈냐옹크앙끼잉!';
  }
}

class Dog extends Animal { // 이걸 상속(inheritance) 라고 부름
  makeSound() { // 함수의 오버라이딩
                // 부모 함수를 그대로 쓸 수도 있고, 내가 재정의할 수도 있음
    return `${this.name} 멍멍`;
  }
}

class Cat extends Animal {
  makeSound() {
    return `${this.name} 미야옹`;
  }
}

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