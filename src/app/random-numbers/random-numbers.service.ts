export class RandomNumbersService {
  numbers: number;
  min = 1000;
  max = 1000;
  msTimeout = 1000;

  constructor() { }

  generateNumbers() {
    return this.numbers = Math.floor((Math.random() * this.max) + this.min);
  }

  increaseNumbersLength() {
    this.min *= 10;
    this.max *= 10;
  }

  increaseShowTimeout() {
    this.msTimeout -= 100;
  }
}
