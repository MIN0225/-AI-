const Car = require('./Car');

class Sedan extends Car{
  constructor(brand, model, color, trunkSize) {
    super(brand, model, color, trunkSize);
  }
}

module.exports = Sedan;