class Blockchain {
  timestamp: number; // Unix Epoch time

  constructor() {
    this.timestamp = Date.now();
  }
}

var bc = new Blockchain();
console.log(bc);
