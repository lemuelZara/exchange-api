<p align="center">
  <img src="./.github/logo.svg" width="230" alt="Exchange image" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-fff?logo=node.js" alt="Node.js" />&nbsp;&nbsp;
  <img src="https://img.shields.io/badge/TypeScript-fff?logo=typescript" alt="TypeScript" />&nbsp;&nbsp;
  <img src="https://img.shields.io/badge/NestJS-fff?logo=nestjs&logoColor=e0234f" alt="NestJS" />&nbsp;&nbsp;
  <img src="https://img.shields.io/badge/MongoDB-fff?logo=mongodb" alt="NestJS" />&nbsp;&nbsp;
</p>

<h1 align="center">Exchange API</h1>
<p align="center">API for currency conversion using TDD.</p>

<p align="center">
  <a href="https://insomnia.rest/run/?label=Exchange%20API&uri=https%3A%2F%2Fgithub.com%2FlemuelZara%2Fexchange-api%2Ftree%2Fmain%2F.github%2Finsomnia.json">
    <img src="https://insomnia.rest/images/run.svg" />
  </a>
</p>

</br>

## 👷 Installation

```bash
$ yarn install
```

</br>

## 🏃 Running the app

Obs: I used MongoDB Atlas for the database service.

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev
```

Routes of aplication:
```bash
# Create Currency
# POST /currencies
curl -d '{"currency": "BRL", "value": 1}' -H "Content-Type: application/json" -X POST http://localhost:3000/currencies

# Get Currency
# GET /currencies/:currency
curl 'http://localhost:3000/currencies/BRL'

# Update Currency
# PATCH /currencies/:currency/value
curl -d '{"value": 0.5}' -H "Content-Type: application/json" -X PATCH http://localhost:3000/currencies/BRL/value

# Delete Currency
# DELETE /currencies/:currency
curl -X DELETE http://localhost:3000/currencies/BRL

# Convert Amount
# GET /exchange?from=currency&to=currency&amount=amount
curl 'http://localhost:3000/exchange?from=BRL&to=USD&amount=5'
```

</br>

## 🧪 Test

```bash
# unit tests
$ yarn test

# test coverage
$ yarn test:cov
```

</br>

## 📮 Stay in touch

- Author - [Lemuel Coelho Zara](https://linkedin.com/in/lemuelZara)

<br>

## 📕 License

Exchange API is [MIT licensed](LICENSE).
