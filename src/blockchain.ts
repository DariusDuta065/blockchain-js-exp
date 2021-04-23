import sha256 from "crypto-js/sha256.js";
import { SmartContractData } from "./interfaces";

export class Block {
  timestamp: number; // Unix Epoch time

  data: SmartContractData;
  previousHash: string;
  nonce: number;
  hash: string;

  constructor(data: SmartContractData, previousHash: string) {
    this.timestamp = Date.now();

    this.data = data;
    this.previousHash = previousHash;

    const { nonce, hash } = this.findHash();
    this.nonce = nonce;
    this.hash = hash;
  }

  findHash(numOfZeros = 4): { nonce: number; hash: string } {
    let nonce = 0;
    let hash = sha256(`${nonce}`).toString();
    const targetPrefix = "0".repeat(numOfZeros);

    console.time("findHash");
    const isHashValid = () => hash.slice(0, numOfZeros) === targetPrefix;

    while (!isHashValid()) {
      const stringToHash = `${nonce++}${this.timestamp}${this.data.description}${this.previousHash}`;
      hash = sha256(stringToHash).toString();
    }

    console.timeEnd("findHash");
    return { nonce, hash: hash.toString() };
  }
}

/**
 * Creates a simple block.
 */
const simpleBlock = () => {
  const bc = new Block({ description: "coinbase to alice 1 BTC" }, "0x");
  console.log(bc);
};

/**
 * Illustrates the chain of blocks.
 */
const multipleBlocks = () => {
  const b1 = new Block({ description: "coinbase to alice 1 BTC" }, "0x");
  const b2 = new Block({ description: "alice to bob 1 BTC" }, b1.hash);
  const b3 = new Block({ description: "bob to charlie 0.5 BTC" }, b2.hash);

  console.log('Block 1', b1);
  console.log('Block 2', b2);
  console.log('Block 3', b3);
};

// Driver code

// simpleBlock();
multipleBlocks();
