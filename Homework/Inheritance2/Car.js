class Car {
  constructor(brand, model, color, trunkSize) {
    this.brand = brand;
    this.model = model;
    this.color = color;
    this.trunkSize = trunkSize;
  }

  start() {
    console.log(`${this.brand} ${this.model}가 시동을 걸었습니다.`);
  }

  stop() {
    console.log(`${this.brand} ${this.model}가 멈췄습니다.`);
  }
}

module.exports = Car;