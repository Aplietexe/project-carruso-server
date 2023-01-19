# project-carruso-server

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
