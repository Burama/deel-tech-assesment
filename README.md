# Deel tech assesment

## Summary

This GitHub repository contains the solution to the tech assessment task from Deel.

## Prerequisites

- Node.js installed
- yarn installed

## Usage

NOTE: .env file must be create based on .env.example.

```bash
# Install
$ yarn install

# Build
$ yarn build

# Run
$ yarn start
```

## Technical Debt & potential improvements

- Tests: Implement comprehensive test coverage for the application.
- SQL Optimization: Optimize SQL requests for better database performance.
- Error Handling & Validation: Implement robust error handling and validation mechanisms for a more resilient application.
- Transaction Entity: Create a new entity (e.g., Transaction) to handle all profile balance operations systematically.
- Caching: Integrate caching mechanisms (e.g., Redis) to enhance performance.
- Swagger Integration: Integrate Swagger for faster development and improved API documentation.
- Authentication Logic: Develop proper authentication logic using JWT tokens. For instance, redefine the Profile entity into a User entity with roles (user, admin) and occupations (contractor, client).

