const SHA256 = require('crypto-js/sha256')

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress
        this.toAddress = toAddress
        this.amount = amount
    }
}

class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.transactions = transactions
        this.timestamp = timestamp
        this.previousHash = previousHash
        this.hash = this.calculateHash();
        this.nonce = 0;

    }

    calculateHash() {
        return SHA256(JSON.stringify(this.transactions) + this.timestamp + this.previousHash + this.nonce).toString();
    }
    mineNewBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.calculateHash()
        }
        console.log('new block mined with hash:', this.hash)

    }
}

class blockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()]
        this.difficulty = 1
        this.pendingTransactions = []
        this.miniRewards = 10

    }

    createGenesisBlock() {
        return new Block(0, '01/01/2018', 'this is a string', '0')
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1]
    }

    minePendingTransaction(miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash)
        block.mineNewBlock(this.difficulty)

        console.log('block Mined Succesfully', JSON.stringify(block))

        this.chain.push(block)
        this.pendingTransactions = [

            new Transaction(null, miningRewardAddress, this.miningReward)

        ];

    }
    checkValidity() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i - 1]

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                console.log('1')
                return false
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                console.log(currentBlock.previousHash)
                return false
            }
        }
        return true
    }
    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }
    getBalanceofAddress(address) {
        let balance = 0
        for (const block of this.chain) {
            for (const transaction of block.transactions) {
                if (transaction.fromAddress === address) {

                    console.log(transaction.fromAddress, transaction.toAddress, address, transaction.amount)
                    balance = balance - transaction.amount
                }
                if (transaction.toAddress === address) {
                    balance = balance + transaction.amount
                }
            }
        }
        return balance
    }
}

let bawacoin = new blockChain();

transaction1 = new Transaction('zain', 'bilal', 100)
bawacoin.createTransaction(transaction1)

transaction2 = new Transaction('bilal', 'zain', 35)
bawacoin.createTransaction(transaction2)

console.log('started mining')
bawacoin.minePendingTransaction('Taf')

console.log('balance for Zain', bawacoin.getBalanceofAddress('zain'))
console.log('balance for Bilal', bawacoin.getBalanceofAddress('bilal'))
console.log('balance for Taf', bawacoin.getBalanceofAddress('Taf'))