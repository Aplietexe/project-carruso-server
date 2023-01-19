# project-carruso-server

![Express](https://img.shields.io/badge/Made_with-Express.js-000000?style=for-the-badge&logo=express&labelColor=white&logoColor=000000)
![Node](https://img.shields.io/badge/Made_with-Node.js-339933?style=for-the-badge&logo=node.js&labelColor=white)
![MongoDB](https://img.shields.io/badge/Made_with-MongoDB-47A248?style=for-the-badge&logo=mongodb&labelColor=white)
![TypeScript](https://img.shields.io/badge/Made_with-typescript-3178C6?style=for-the-badge&logo=typescript&labelColor=white)

![ESLint](https://img.shields.io/badge/Lint-ESLint-4B32C3?style=for-the-badge&logo=eslint&labelColor=white&logoColor=4B32C3)
![Prettier](https://img.shields.io/badge/code_style-Prettier-F7B93E?style=for-the-badge&logo=prettier&labelColor=white)

The backend for a MERN website I started for a car dealer.

It consists of a REST Express API written in TypeScript that performs the necessary CRUD operations over several resources, communicating with a MongoDB database. As libraries, it uses DOMPurify, jsonschema and validator for sanitization and validation.

For tooling, this project uses TypeScript, ESLint with several plugins, CSpell and Prettier.

The project didn't go through at the end because of limited funds, which is why it is incomplete and some CRUD operations are missing.

## Links

- [Frontend](https://github.com/Aplietexe/project-carruso-client)

- There's a live server running at <https://carruso-server.cyclic.app>.

## Endpoints

| **Method** | **Path**         |
| ---------- | ---------------- |
| GET        | /cars            |
| POST       | /car             |
| GET        | /car/:id         |
| DELETE     | /car/:id         |
| GET        | /contactMessages |
| POST       | /contactMessage  |
| POST       | /creditRequest   |
