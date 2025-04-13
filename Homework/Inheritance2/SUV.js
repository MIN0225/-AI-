const Car = require('./Car');

class SUV extends Car{
  consturtor(brand, model, color, trunkSize) {
    super(brand, model, color, trunkSize);
  }
}

module.exports = SUV;