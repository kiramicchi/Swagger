/// <reference types="cypress" />

describe('Swagger Petstore API Test Cases', function () {

    beforeEach(() => {
        cy.wait(3000);
    });

    // POST - Create user
    it('POST - Create user', function () {
        cy.api({
            method: 'POST',
            url: 'https://petstore.swagger.io/v2/user',
            body:
            {
                id: 1,
                username: 'kiramii',
                firstName: 'Faye',
                lastName: 'Abusaman',
                email: 'kira@gmail.com',
                password: 'kira123',
                phone: '12141214',
                userStatus: 1
            },
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('message');
            expect(response.body.message).to.be.a('string');
        });
    });

    // POST - Create list of users
    it('POST - Create list of users - LIST', function () {
        cy.api({
            method: 'POST',
            url: 'https://petstore.swagger.io/v2/user/createWithList',
            body: [
                {
                    id: 2,
                    username: 'krabbey',
                    firstName: 'Ethan',
                    lastName: 'Lu',
                    email: 'krab@gmail.com',
                    password: 'krab123',
                    phone: '12141214',
                    userStatus: 1
                },
                {
                    id: 3,
                    username: 'kuromii',
                    firstName: 'Kuromi',
                    lastName: 'Sanrio',
                    email: 'kuromi@gmail.com',
                    password: 'kuro123',
                    phone: '12141214',
                    userStatus: 1
                }
            ],
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('message');
            expect(response.body.message).to.be.a('string');
        });
    });

    // PUT - Update user
    it('PUT - Updated user', function () {
        cy.api({
            method: 'PUT',
            url: 'https://petstore.swagger.io/v2/user/kiramii',
            body: {
                id: 1,
                username: 'kiramii',
                firstName: 'Faye',
                lastName: 'Abusaman',
                email: 'kira4@gmail.com',
                password: 'kira123',
                phone: '12141214',
                userStatus: 1
            },
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('message', '1');
        });
    });

    // PUT - Error 500
    it('PUT - Update value with invalid data type', () => {
        cy.api({
            method: 'PUT',
            url: 'https://petstore.swagger.io/v2/user/kiramii',
            body: {
                id: 1,
                username: 'kiramii',
                firstName: 'Faye',
                lastName: 'Abusaman',
                email: 'kira@gmail.com',
                password: 'kira123',
                phone: '12141214',
                userStatus: "invalidString" // This causes a 500 on Swagger
            },
            failOnStatusCode: false, // let Cypress handle the 500
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            expect(response.status).to.eq(500);
            expect(response.body).to.have.property('message');
        });
    });

    // GET - Get user by username
    it('GET - Get user by user name', function () {
        cy.api({
            method: 'GET',
            url: 'https://petstore.swagger.io/v2/user/kiramii',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.headers['content-type']).to.include('application/json');
            expect(response.body).to.have.property('username', 'kiramii');
        });
    });

    // GET - Login a non-existent user
    it('GET - Login a non-existent user', function () {
        cy.api({
            method: 'GET',
            url: 'https://petstore.swagger.io/v2/user/thisUserDoesNotExist',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body.message).to.contain('User not found');
        });
    });

    // DELETE - Delete existing user
    it('DELETE - Delete existing user', function () {
        cy.api({
            method: 'DELETE',
            url: 'https://petstore.swagger.io/v2/user/kiramii',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.code).to.eq(200);
            expect(response.body.message).to.eq('kiramii');
        });
    });

    // DELETE - Delete non-existing user
    it('DELETE - Delete non-existing user', function () {
        cy.api({
            method: 'DELETE',
            url: 'https://petstore.swagger.io/v2/user/kuromilol',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404);
        });
    });
});
