# Wallet System

## Description

The Wallet and Transaction Management System is a web application that allows users to create wallets with an initial balance and perform credit or debit transactions on these wallets. The system provides endpoints for managing wallets and transactions, and it is built using NestJS, a powerful Node.js framework, along with MongoDB for data storage.

## Features

- **Setup wallet with an initial balance**

  - User can setup a wallet, with some initial balance.
  - Each wallet has a unique name ( caseSensitive)

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
- [Schema Design](#schema-design)
- [Technologies Used](#technologies-used)
- [Note](#note)
- [Scope For Improvements](#scope-for-imporvements)

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

**You can also access deployed version [here](https://wallet-system-production-f627.up.railway.app/api#/)**

# Schema Design

The Wallet and Transaction Management System is designed to efficiently manage wallets and their associated transactions using MongoDB as the database. The schema design plays a crucial role in ensuring data integrity, scalability, and query performance. Below are the key design choices for the schema:

## Separate Collections for Wallets and Transactions

One of the fundamental design decisions is to store wallets and transactions in separate collections rather than nesting transactions within wallets. This approach offers several advantages:

- **Scalability**: By storing transactions in a separate collection, the system can handle an unlimited number of transactions without affecting the performance of wallet operations.

- **Query Performance**: Separating transactions allows efficient indexing and querying, enabling faster retrieval of specific transactions or sets of transactions associated with a particular wallet.

- **Flexibility**: Keeping transactions independent of wallets allows for more straightforward data manipulation and avoids potential document size limitations.

## Wallet Schema

The `Wallet` schema represents a user's wallet and is designed to store information about the user's account balance and transaction history. It includes the following properties:

- `id`: A unique `(auto generated)` id of the wallet.
- `name`: A unique string that serves as the name or identifier of the wallet.
- `balance`: A positive number representing the current balance in the wallet. The balance is rounded to a maximum of four decimal places for precision.
- `date`: The date when the wallet was created.

## Transaction Schema

The `Transaction` schema is used to record individual transactions made on a specific wallet. Each transaction corresponds to a credit or debit operation and includes the following properties:

- `id`: A unique `(auto generated)` id of the transaction.
- `amount`: A positive number representing the amount of the transaction. Similar to the `balance` property in the `Wallet` schema, we use the `setPrecision` function to ensure precision for the amount.
- `walletId`: A reference to the wallet to which the transaction belongs. It is stored as a MongoDB ObjectId and links the transaction to a specific wallet.
- `description`: A string containing remarks or a description of the transaction.
- `type`: A string indicating the type of the transaction, which can be either `'CREDIT'` or `'DEBIT'`.
- `date`: The date when the transaction took place.

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

## Scope For Improvements

- **Dockerization**: Containerize the application for easy deployment and environment isolation using Docker and Docker Compose.
- **CI/CD**: Implement automated testing and continuous integration pipelines for faster feedback and continuous deployment.
- **Logging**: Set up centralized logging with ELK Stack or Graylog to monitor and troubleshoot the application effectively.
- **Build Tools**: Utilize better build tools like vite, rollup etc.
