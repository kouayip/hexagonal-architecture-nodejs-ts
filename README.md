# Project Structure

This project follows a hexagonal architecture, also known as a ports and adapters architecture, which is a software design approach focused on the separation of concerns. By combining this with the principles of Domain-Driven Design (DDD) and SOLID, the project is organised in such a way as to favour the maintainability, scalability and readability of the code.

## Architecture Hexagonale

The hexagonal architecture is based on three main concepts: domain, interfaces and infrastructure.

- `src/` : Le répertoire racine du code source.
    - `application/` : Application services.
    - `domain/` : Domain entities, aggregates, repositories, etc.
    - `infrastructure/` : MongoDB, fastify, express, external services, etc.
    - `interfaces/` : Express controllers, inversify modules, etc.
    - `main.ts` : The application's entry point.

## Compliance with DDD and SOLID principles

By using hexagonal architecture, this project respects the principles of Domain-Driven Design (DDD) and SOLID.

- **DDD** : Domain concepts are clearly identified and isolated in the `domain/` directory, enabling more accurate business modelling and increased scalability. Domain services and entities are designed to reflect the ubiquitous language of the business, promoting common understanding across team members.

- **SOLID**: SOLID principles are respected by using a modular structure and separating the different responsibilities of the system. Each component has a unique responsibility and is easily replaceable without disrupting the rest of the system. For example, interfaces are defined in such a way that they can be adapted to different frameworks or technologies without affecting the core of the application.

This architectural approach creates a robust, flexible and easily maintainable system, in line with software design best practice.

# Installation & setup

```shell
yarn install
```

# Running the app

Run the program.

```shell
yarn dev
```

# Test

```shell
# unit tests
yarn test
```
