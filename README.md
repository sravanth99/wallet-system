<<<<<<< HEAD
<<<<<<< HEAD
# wallet-system
Wallet Sytem BE Dev
=======
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->
=======
# Wallet System
>>>>>>> c32f4a7 (added readme.md)

## Description

This is a Nest.js project that provides a wallet management system with the following features:

- **Setup wallet with an initial balance**

  - User can setup a wallet, with some initial balance.
  - Each wallet has a unique name ( caseInsensitive)

- **Transactions (CREDIT or DEBIT)**

  - User can perform transaction on the wallet.
  - After every successful transaction wallet's balance is updated.

- **Fetch wallet details**

  - User can access the wallet details

- **Fetch transactions of a wallet**
  - User can access the transactions performed on a wallet.
  - Transactions are sorting in descending order by date.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Installation

Follow these steps to set up the project locally:

1. Clone the repository: `git clone https://github.com/sravanth99/wallet-system.git`
2. Navigate to the project directory: `cd wallet-system`
3. Install dependencies: `pnpm install`

## Usage

Follow these steps to run the project:

1. Start the development server: `pnpm run start:dev`
2. The server will be running at `http://localhost:3000`

## API Documentation

The API documentation is generated using Swagger. To access the API documentation, run the project and visit `http://localhost:3000/api` in your web browser.

## Technologies Used

- Nest.js: A progressive Node.js framework for building efficient and scalable server-side applications.
- MongoDB: A popular NoSQL database for storing and managing wallet and transaction data.
- Swagger: To automatically generate API documentation for the project.

## Note

Due to my current work load, and time constraints I couldn't

<<<<<<< HEAD
## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
>>>>>>> 4338a75 (initial project setup and swagger integration)
=======
- complete optional UI part
- cover e2e tests
- address redundant code in few places
- remove magic strings
>>>>>>> c32f4a7 (added readme.md)
