# Wallet System

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

1. Set the `DB_URI` environment variable to your mongodb url
2. Start the development server: `pnpm run start:dev`
3. The server will be running at `http://localhost:3000`

## API Documentation

The API documentation is generated using Swagger. To access the API documentation, run the project and visit `http://localhost:3000/api` in your web browser.

## Technologies Used

- Nest.js: A progressive Node.js framework for building efficient and scalable server-side applications.
- MongoDB: A popular NoSQL database for storing and managing wallet and transaction data.
- Swagger: To automatically generate API documentation for the project.

## Note

Due to my current work load, and time constraints I couldn't

- complete optional UI part
- cover e2e tests
- address redundant code in few places
- remove magic strings
