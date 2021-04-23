import sha256 from "crypto-js/sha256.js";
var Block = /** @class */ (function () {
    function Block(data, previousHash) {
        this.timestamp = Date.now();
        this.data = data;
        this.previousHash = previousHash;
        var _a = this.findHash(), nonce = _a.nonce, hash = _a.hash;
        this.nonce = nonce;
        this.hash = hash;
    }
    Block.prototype.findHash = function (numOfZeros) {
        if (numOfZeros === void 0) { numOfZeros = 4; }
        var nonce = 0;
        var hash = sha256("" + nonce).toString();
        var targetPrefix = "0".repeat(numOfZeros);
        console.time("findHash");
        var isHashValid = function () { return hash.slice(0, numOfZeros) === targetPrefix; };
        while (!isHashValid()) {
            var stringToHash = "" + nonce++ + this.timestamp + this.data.description + this.previousHash;
            hash = sha256(stringToHash).toString();
        }
        console.timeEnd("findHash");
        return { nonce: nonce, hash: hash.toString() };
    };
    return Block;
}());
export { Block };
/**
 * Creates a simple block.
 */
var simpleBlock = function () {
    var bc = new Block({ description: "coinbase to alice 1 BTC" }, "0x");
    console.log(bc);
};
/**
 * Illustrates the chain of blocks.
 */
var multipleBlocks = function () {
    var b1 = new Block({ description: "coinbase to alice 1 BTC" }, "0x");
    var b2 = new Block({ description: "alice to bob 1 BTC" }, b1.hash);
    var b3 = new Block({ description: "bob to charlie 0.5 BTC" }, b2.hash);
    console.log('Block 1', b1);
    console.log('Block 2', b2);
    console.log('Block 3', b3);
};
// Driver code
// simpleBlock();
multipleBlocks();
//# sourceMappingURL=blockchain.js.map