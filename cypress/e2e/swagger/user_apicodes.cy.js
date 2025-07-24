/// <reference types="cypress" />

describe('Swagger Petstore API Test Cases', function () {
    // POST - Create user
    it('POST - Create user', function () {
        cy.request({
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
        cy.request({
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
        cy.request({
            method: 'PUT',
            url: 'https://petstore.swagger.io/v2/user/kiramii',
            body: {
                id: 1,
                username: 'kiramii',
                firstName: 'Faye',
                lastName: 'Abillada',
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

    // GET - Get user by username
    it('GET - Get user by user name', function () {
        cy.request({
            method: 'GET',
            url: 'https://petstore.swagger.io/v2/user/kiramii',
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.headers['content-type']).to.include('application/json');
            expect(response.body).to.have.property('firstName', 'Faye');
            expect(response.body).to.have.property('lastName', 'Abusaman');
            expect(response.body).to.have.property('email', 'kira@gmail.com');
            expect(response.body).to.have.property('password', 'kira123');
            expect(response.body).to.have.property('phone', '12141214');
            expect(response.body).to.have.property('userStatus', 1);
        });
    });

    // GET - Login a non-existent user
    it('GET - Login a non-existent user', function () {
        cy.request({
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
        cy.request({
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
        cy.request({
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
