# Swagger Petstore API Test Suite

This project contains Cypress API test cases for the [Swagger Petstore API](https://petstore.swagger.io/), focused on testing the `user` endpoints. The tests include creation, retrieval, update, deletion, and negative scenarios.

---

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [Cypress](https://www.cypress.io/) installed as a dev dependency

### Installation

1. Clone this repository
2. Install dependencies

### Running the Tests
To run the tests, enter the following lines in the Command Line Interface (Terminal):

**1. Headed Mode**
   
      npx cypress run --spec 'cypress/e2e/swagger/user_apicodes.cy.js' --browser chrome --headed

**2. Headless Mode**
   
      npx cypress run --spec 'cypress/e2e/swagger/user_apicodes.cy.js'

### Features
-------------------------------------------------------------------------------------
| Method   | Description                             | Endpoint                     |
| -------- | --------------------------------------- | ---------------------------- |
| `POST`   | Create a single user                    | `/user`                      |
| `POST`   | Create a list of users                  | `/user/createWithList`       |
| `PUT`    | Update an existing user                 | `/user/{username}`           |
| `GET`    | Retrieve a user by username             | `/user/{username}`           |
| `GET`    | Attempt to retrieve a non-existent user | `/user/thisUserDoesNotExist` |
| `DELETE` | Delete an existing user                 | `/user/{username}`           |
| `DELETE` | Delete a non-existent user              | `/user/kuromilol`            |
-------------------------------------------------------------------------------------

### Notes
- **user_apicodes.cy.js** is the main test script.
- The test data includes 3 users: kiramii, krabbey, and kuromii.
- Swagger Petstore is a public test API — no authentication required.
- Delays (cy.wait(3000)) are added in beforeEach() to prevent rate-limiting or async issues.

