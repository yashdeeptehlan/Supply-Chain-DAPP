# Supply-Chain DAPP

This project is aimed to be a real-world Supply chain decentralized application.

## Prerequisites

Before getting started, ensure that you have the following tools installed on your system:

- [Node.js](https://nodejs.org/)
- [Truffle](https://www.trufflesuite.com/truffle)
- [Ganache](https://www.trufflesuite.com/ganache)

## Installation

If Truffle and Ganache are not installed on your system globally, you can install them using npm:

```bash
npm install -g truffle ganache
```

Once you have Truffle and Ganache installed, follow the steps below to set up and run the project:

Install Dependencies:
```bash
npm install
```

Start Ganache CLI:
```bash
ganache
```

Compile and Deploy Smart Contract:
```bash
cd truffle
truffle migrate --network development
```

Start the Application:
```bash
cd client
npm start
```

Once the application is started, you can access it at http://localhost:8080/.

Connect Metamask with Ganache CLI Account[0]:
Add Network Manually:

Network name: <any_name>
New RPC url: http://localhost:8545
Chain Id: 1337
Currency symbol: ETH
Add Account[0] using Private Key:

Click "Add account or hardware wallet".
Select type "Private Key", and paste the Account[0] privatekeyfrom Ganache.
Make sure you are connected with the Account[0] in Metamask when making transactions.
