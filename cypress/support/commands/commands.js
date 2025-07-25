// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//Registration
Cypress.Commands.add('visitParabankRegistration', () => {
  cy.visit('https://parabank.parasoft.com/parabank/register.htm');
});

Cypress.Commands.add('checkRegistrationFormUI', () => {
  cy.get('#rightPanel').should('be.visible');
  cy.get('.title').should('be.visible');
  cy.get('#rightPanel > p').should('be.visible');
  cy.get('.form2').should('be.visible');
});

Cypress.Commands.add('checkRegistrationLabels', () => {
  const labelChecks = [
    { selector: ':nth-child(1) > [align="right"] > b', text: 'First Name:' },
    { selector: ':nth-child(2) > [align="right"] > b', text: 'Last Name:' },
    { selector: ':nth-child(3) > [align="right"] > b', text: 'Address:' },
    { selector: ':nth-child(4) > [align="right"] > b', text: 'City:' },
    { selector: ':nth-child(5) > [align="right"] > b', text: 'State:' },
    { selector: ':nth-child(6) > [align="right"] > b', text: 'Zip Code:' },
    { selector: ':nth-child(7) > [align="right"] > b', text: 'Phone #:' },
    { selector: ':nth-child(8) > [align="right"] > b', text: 'SSN:' },
    { selector: ':nth-child(10) > [align="right"] > b', text: 'Username:' },
    { selector: ':nth-child(11) > [align="right"] > b', text: 'Password:' },
    { selector: ':nth-child(12) > [align="right"] > b', text: 'Confirm:' },
  ];

  labelChecks.forEach(({ selector, text }) => {
    cy.get(selector).should('be.visible').and('have.text', text);
  });
});

Cypress.Commands.add('checkRegistrationInputsEmpty', () => {
  const ids = [
    'customer.firstName', 'customer.lastName', 'customer.address.street',
    'customer.address.city', 'customer.address.state', 'customer.address.zipCode',
    'customer.phoneNumber', 'customer.ssn', 'customer.username',
    'customer.password', 'repeatedPassword'
  ];

  ids.forEach(id => {
    cy.get(`input[id='${id}']`).should('be.visible').and('be.enabled').and('be.empty');
  });
});

Cypress.Commands.add('fillRegistrationForm', (user) => {
  cy.get("input[id='customer.firstName']").type(user.FirstName);
  cy.get("input[id='customer.lastName']").type(user.LastName);
  cy.get("input[id='customer.address.street']").type(user.Address);
  cy.get("input[id='customer.address.city']").type(user.City);
  cy.get("input[id='customer.address.state']").type(user.State);
  cy.get("input[id='customer.address.zipCode']").type(user.ZipCode);
  cy.get("input[id='customer.phoneNumber']").type(user.PhoneNumber);
  cy.get("input[id='customer.ssn']").type(user.ssn);
  cy.get("input[id='customer.username']").type(user.Username);
  cy.get("input[id='customer.password']").type(user.Password);
  cy.get("input[id='repeatedPassword']").type(user.Password);
});

Cypress.Commands.add('submitRegistrationForm', () => {
  cy.get('[colspan="2"] > .button').click();
});

Cypress.Commands.add('checkRegistrationSuccess', () => {
  cy.url().should('include', 'parabank.parasoft.com/parabank/register.htm');
  cy.get('.title').should('be.visible').and('include.text', 'Welcome');
  cy.get('#rightPanel > p').should('be.visible').and('have.text', 'Your account was created successfully. You are now logged in.');
});

Cypress.Commands.add('checkRegistrationRequiredErrors', () => {
  for (const i of [1, 2, 3, 4, 5, 6, 8, 10, 11, 12]) {
    cy.get(`:nth-child(${i}) > [width="50%"]`).should('be.visible').and('include.text', 'required');
  }
});

// Open Account
Cypress.Commands.add('visitParabankAndLogin', (user) => {
  cy.visit('https://parabank.parasoft.com/parabank/register.htm');
  cy.get('form > :nth-child(2) > .input').should('be.visible').and('be.empty').type(user.Username);
  cy.get(':nth-child(4) > .input').should('be.visible').and('be.empty').type(user.Password);
  cy.get(':nth-child(5) > .button').click();
});

Cypress.Commands.add('goToOpenAccountPage', () => {
  cy.get('#leftPanel > ul > :nth-child(1) > a')
    .should('be.visible').and('contain.text', 'Open New Account').click();
  cy.url().should('include', '/openaccount.htm');
});

Cypress.Commands.add('checkOpenAccountUI', () => {
  cy.get('#rightPanel').should('be.visible');
  cy.get('#openAccountForm > .title').should('be.visible').and('have.text', 'Open New Account');
  cy.get('form > :nth-child(1) > b').should('be.visible');
  cy.get(':nth-child(5) > b').should('be.visible');
  cy.get('#type').should('be.visible').and('be.enabled');
  cy.get('#fromAccountId').should('be.visible').and('be.enabled');
  cy.get('form > div > .button').should('be.visible').and('be.enabled');
});

Cypress.Commands.add('selectAccountType', (type = 'SAVINGS') => {
  cy.get('#type').select(type);
});

Cypress.Commands.add('selectFromAccount', (index = 0) => {
  cy.get('#fromAccountId').find('option').eq(index).then(option => {
    cy.get('#fromAccountId').select(option.val());
  });
});

Cypress.Commands.add('submitOpenAccountForm', () => {
  cy.get('form > div > .button').click();
});

Cypress.Commands.add('checkOpenAccountSuccessAndValidateID', () => {
  cy.get('#openAccountResult > .title').should('be.visible').and('have.text', 'Account Opened!');
  cy.get('#openAccountResult > :nth-child(2)').should('be.visible').and('contain.text', 'Congratulations');
  cy.get('#openAccountResult > :nth-child(3)').should('be.visible').and('contain.text', 'Your new account number');

  cy.get('#newAccountId')
    .invoke('text')
    .then((newAccountId) => {
      const id = newAccountId.trim();

      cy.log(`Generated Account ID: ${id}`);

      cy.visit(`https://parabank.parasoft.com/parabank/activity.htm?id=${id}`);

      cy.get('#accountId', { timeout: 10000 }).should(($el) => {
        const text = $el.text().trim();
        expect(text).to.eq(id);
      });
    });
});

// Update Information
Cypress.Commands.add('goToUpdateInfoPage', () => {
  cy.get('#leftPanel > ul > :nth-child(6) > a')
    .should('be.visible')
    .and('contain.text', 'Update Contact Info')
    .click();

  cy.url().should('include', '/updateprofile.htm');
});

Cypress.Commands.add('checkUpdateInfoUI', () => {
  cy.get('#rightPanel').should('be.visible');
  cy.get('#updateProfileForm > .title').should('be.visible').and('have.text', 'Update Profile');
  cy.get('.form2').should('be.visible');

  const labels = [
    { selector: ':nth-child(1) > [align="right"] > b', text: 'First Name:' },
    { selector: ':nth-child(2) > [align="right"] > b', text: 'Last Name:' },
    { selector: ':nth-child(3) > [align="right"] > b', text: 'Address:' },
    { selector: ':nth-child(4) > [align="right"] > b', text: 'City:' },
    { selector: ':nth-child(5) > [align="right"] > b', text: 'State:' },
    { selector: ':nth-child(6) > [align="right"] > b', text: 'Zip Code:' },
    { selector: ':nth-child(7) > [align="right"] > b', text: 'Phone #:' }
  ];

  labels.forEach(({ selector, text }) => {
    cy.get(selector).should('be.visible').and('have.text', text);
  });

  [
    'customer.firstName',
    'customer.lastName',
    'customer.address.street',
    'customer.address.city',
    'customer.address.state',
    'customer.address.zipCode',
    'customer.phoneNumber'
  ].forEach(id => {
    cy.get(`input[id='${id}']`).should('be.visible').and('be.enabled')
      .invoke('val').should('not.be.empty');
  });

  cy.get('[colspan="2"] > .button').should('be.visible').and('be.enabled');
});

Cypress.Commands.add('updateContactInfo', (data) => {
  cy.get('input[id="customer.phoneNumber"]').clear();
  cy.get('input[id="customer.firstName"]').clear().invoke('val', '');
  cy.get('input[id="customer.firstName"]').clear().type(data.firstName);
  cy.get('input[id="customer.lastName"]').clear().type(data.lastName);
  cy.get('input[id="customer.address.street"]').clear().type(data.address);
  cy.get('input[id="customer.address.city"]').clear().type(data.city);
  cy.get('input[id="customer.address.state"]').clear().type(data.state);
  cy.get('input[id="customer.address.zipCode"]').clear().type(data.zip);
  cy.get('input[id="customer.phoneNumber"]').clear().type(data.phone);
  cy.get('[colspan="2"] > .button').click();
});

Cypress.Commands.add('checkUpdateSuccess', (firstName) => {
  cy.get('#updateProfileResult > .title').should('be.visible').and('have.text', 'Profile Updated');
  cy.get('#updateProfileResult > p').should('be.visible').and('contain.text', 'updated');
  cy.get('.smallText').should('be.visible').and('contain.text', firstName);
});

Cypress.Commands.add('clearAllContactFieldsAndSubmit', () => {
  [
    'customer.phoneNumber',
    'customer.phoneNumber',
    'customer.firstName',
    'customer.lastName',
    'customer.address.street',
    'customer.address.city',
    'customer.address.state',
    'customer.address.zipCode',
    'customer.phoneNumber'
  ].forEach(id => {
    cy.get(`input[id="${id}"]`).clear();
  });
  cy.get('[colspan="2"] > .button').click();
});

Cypress.Commands.add('checkRequiredUpdateErrors', () => {
  for (const i of [1, 2, 3, 4, 5, 6]) {
    cy.get(`:nth-child(${i}) > [width="50%"]`).should('be.visible').and('include.text', 'required');
  }
});

// Logout
Cypress.Commands.add('logoutFromParabank', () => {
  cy.get('#leftPanel > ul > :nth-child(8) > a')
    .should('be.visible')
    .click();
  cy.url().should('include', '/index.htm');
});

// Account Overview
Cypress.Commands.add('checkAccountOverviewTable', () => {
  cy.get('thead > tr > :nth-child(1)').should('be.visible').and('include.text', 'Account');
  cy.get('thead > tr > :nth-child(2)').should('be.visible').and('include.text', 'Balance');
  cy.get('thead > tr > :nth-child(3)').should('be.visible').and('include.text', 'Available Amount');
  cy.get('[align="right"]').should('be.visible').and('include.text', 'Total');

  cy.get('tbody tr')
    .not(':contains("Total")')
    .each(($row) => {
      cy.wrap($row).within(() => {
        cy.get('td').eq(0).should('be.visible').and('not.be.empty');
        cy.get('td').eq(1).should('be.visible').and('not.be.empty');
        cy.get('td').eq(2).should('be.visible').and('not.be.empty');
      });
    });

  cy.get('tbody tr').last().within(() => {
    cy.get('td').first().should('contain.text', 'Total');
  });
});

Cypress.Commands.add('validateTotalBalance', () => {
  let sum = 0;

  cy.get('tbody > tr:not(:last-child) > td:nth-child(2)').each(($cell) => {
    const text = $cell.text().replace('$', '').replace(',', '').trim();
    const value = parseFloat(text);
    if (!isNaN(value)) {
      sum += value;
    }
  }).then(() => {
    cy.log(`Computed sum of balances: ${sum}`);

    cy.get(':nth-child(2) > b').invoke('text').then(totalText => {
      const total = parseFloat(totalText.replace('$', '').replace(',', '').trim());
      cy.log(`Displayed total: ${total}`);

      expect(total).to.not.be.NaN;
      expect(sum).to.eq(total);
    });
  });
});

// Transfer Funds
Cypress.Commands.add('goToTransferFundsPage', () => {
  cy.get('#leftPanel > ul > :nth-child(3) > a')
    .should('be.visible')
    .click();
  cy.url().should('include', '/transfer.htm');
});

Cypress.Commands.add('checkTransferFundsUI', () => {
  cy.get('#showForm > .title').should('be.visible').and('include.text', 'Transfer Funds');
  cy.get('#transferForm > p > b').should('be.visible').and('include.text', 'Amount');
  cy.get('#transferForm > p').should('be.visible').and('include.text', '$');
  cy.get('#transferForm > :nth-child(2)').should('be.visible').and('include.text', 'account');

  cy.get('#amount').should('be.visible').and('be.enabled').and('be.empty');
  cy.get('#fromAccountId').should('be.visible').and('be.enabled').and('not.be.empty');
  cy.get('#toAccountId').should('be.visible').and('be.enabled').and('not.be.empty');
  cy.get(':nth-child(4) > .button').should('be.visible').and('be.enabled');
});

Cypress.Commands.add('transferFunds', (amount) => {
  cy.get('#amount').type(amount);

  cy.get('#fromAccountId').find('option').eq(0).then(option => {
    cy.get('#fromAccountId').select(option.val());
  });

  cy.get('#toAccountId').find('option').eq(1).then(option => {
    cy.get('#toAccountId').select(option.val());
  });

  cy.get(':nth-child(4) > .button').click();

  cy.get('#showResult > .title').should('be.visible').and('include.text', 'Transfer Complete');
  cy.get('#showResult > :nth-child(2)').should('be.visible').and('include.text', 'transferred');
});

Cypress.Commands.add('transferFundsNegative', () => {
  cy.get(':nth-child(4) > .button').click();

  cy.get('#showError > .title').should('be.visible').and('include.text', 'Error');
  cy.get('#showError > .error').should('be.visible').and('include.text', 'error');
});

// Bill Pay
Cypress.Commands.add('visitBillPayPage', () => {
  cy.get('#leftPanel > ul > :nth-child(4) > a').should('be.visible').click();
  cy.url().should('include', '/billpay.htm');
});

Cypress.Commands.add('checkBillPayUI', () => {
  cy.get('#rightPanel').should('be.visible');
  cy.get('#billpayForm > .title').should('contain.text', 'Bill Payment');

  const labels = [
    'Payee Name', 'Address', 'City', 'State', 'Zip Code', 'Phone #',
    'Account #', 'Verify Account #', 'Amount', 'From account #'
  ];

  labels.forEach(label => {
    cy.contains('b', label).should('be.visible');
  });

  cy.get(':nth-child(14) > :nth-child(2) > .button').should('be.visible').and('be.enabled');
});

Cypress.Commands.add('fillBillPayForm', (data) => {
  cy.get(':nth-child(1) > [width="20%"] > .input').type(data.name);
  cy.get(':nth-child(2) > [width="20%"] > .input').type(data.address);
  cy.get(':nth-child(3) > [width="20%"] > .input').type(data.city);
  cy.get(':nth-child(4) > [width="20%"] > .input').type(data.state);
  cy.get(':nth-child(5) > [width="20%"] > .input').type(data.zip);
  cy.get(':nth-child(6) > [width="20%"] > .input').type(data.phone);
  cy.get(':nth-child(8) > :nth-child(2) > .input').type(data.account);
  cy.get(':nth-child(9) > [width="20%"] > .input').type(data.account);
  cy.get(':nth-child(11) > [width="20%"] > .input').type(data.amount);

  cy.get(':nth-child(13) > :nth-child(2) > .input')
    .find('option').eq(0).then(option => {
      cy.get(':nth-child(13) > :nth-child(2) > .input').select(option.val());
    });
});

Cypress.Commands.add('submitBillPay', () => {
  cy.get(':nth-child(14) > :nth-child(2) > .button').click();
});

Cypress.Commands.add('checkBillPaySuccess', () => {
  cy.get('#billpayResult > .title').should('include.text', 'Complete');
  cy.get('#billpayResult > :nth-child(2)').should('include.text', 'successful');
});

Cypress.Commands.add('checkBillPayValidationErrors', () => {
  const validationIds = [
    'validationModel-name',
    'validationModel-address',
    'validationModel-city',
    'validationModel-state',
    'validationModel-zipCode',
    'validationModel-phoneNumber',
    'validationModel-account-empty',
    'validationModel-verifyAccount-empty',
    'validationModel-amount-empty'
  ];

  validationIds.forEach(id => {
    cy.get(`#${id}`).should('be.visible');
  });
});

// Find Transactions
Cypress.Commands.add('visitFindTransactionsPage', (user) => {
  cy.visitParabankAndLogin(user);

  cy.get('#leftPanel > ul > :nth-child(5) > a').should('be.visible').click();
  cy.url().should('include', '/findtrans.htm');

  cy.get('#formContainer').should('be.visible');
});

Cypress.Commands.add('checkFindTransactionsUI', () => {
  cy.get('#formContainer > .title').should('be.visible').and('contain.text', 'Find Transactions');
  cy.get('#transactionForm > :nth-child(1) > b').should('be.visible').and('contain.text', 'Select an account');
  cy.get(':nth-child(3) > b').should('be.visible').and('contain.text', 'Find by Transaction ID');
  cy.get(':nth-child(7) > b').should('be.visible').and('contain.text', 'Find by Date');
  cy.get(':nth-child(11) > p > b').should('be.visible').and('contain.text', 'Find by Date Range');
  cy.get(':nth-child(15) > b').should('be.visible').and('contain.text', 'Find by Amount');

  cy.get('#accountId').should('be.visible').and('be.enabled');
  cy.get('#transactionId').should('be.visible').and('be.enabled');
  cy.get('#transactionDate').should('be.visible').and('be.enabled');
  cy.get('#fromDate').should('be.visible').and('be.enabled');
  cy.get('#toDate').should('be.visible').and('be.enabled');
  cy.get('#amount').should('be.visible').and('be.enabled');

  cy.get('#findById').should('be.visible').and('be.enabled');
  cy.get('#findByDate').should('be.visible').and('be.enabled');
  cy.get('#findByDateRange').should('be.visible').and('be.enabled');
  cy.get('#findByAmount').should('be.visible').and('be.enabled');
});

Cypress.Commands.add('findTransactionByAmount', (amount) => {
  cy.get('#amount').clear().type(amount);
  cy.get('#findByAmount').click();

  cy.get('#resultContainer').should('be.visible');
  cy.get('#resultContainer > .title').should('be.visible').and('include.text', 'Transaction Results');
});

Cypress.Commands.add('findTransactionsNegativeCheck', () => {
  cy.get('#findById').click();
  cy.get('#findByDate').click();
  cy.get('#findByDateRange').click();
  cy.get('#findByAmount').click();

  cy.get('#transactionIdError').should('be.visible').and('include.text', 'Invalid');
  cy.get('#transactionDateError').should('be.visible').and('include.text', 'Invalid');
  cy.get('#dateRangeError').should('be.visible').and('include.text', 'Invalid');
  cy.get('#amountError').should('be.visible').and('include.text', 'Invalid');
});

// Request Loan
// Go to Request Loan page
Cypress.Commands.add('goToRequestLoanPage', () => {
  cy.get('#leftPanel > ul > :nth-child(7) > a')
    .should('be.visible')
    .click();
  cy.url().should('include', '/requestloan.htm');
});

// Assert UI of Request Loan page
Cypress.Commands.add('assertRequestLoanUI', () => {
  cy.get('#requestLoanForm').should('be.visible');
  cy.get('.form2').should('be.visible');
  cy.get('#requestLoanForm > .title')
    .should('contain.text', 'Apply for a Loan');

  [
    'Loan Amount',
    'Down Payment',
    'From account #'
  ].forEach((label, i) => {
    cy.get(`.form2 > tbody > :nth-child(${i + 1}) > [align="right"] > b`)
      .should('contain.text', label);
  });

  cy.get('#amount').should('be.visible').and('be.enabled').and('be.empty');
  cy.get('#downPayment').should('be.visible').and('be.enabled').and('be.empty');
  cy.get('#fromAccountId').should('be.visible').and('be.enabled');
  cy.get('[colspan="2"] > .button').should('be.visible').and('be.enabled');
});

// Fill form with data
Cypress.Commands.add('fillRequestLoanForm', ({ amount = '', downPayment = '', accountIndex = 0 } = {}) => {
  if (amount) cy.get('#amount').clear().type(amount);
  if (downPayment) cy.get('#downPayment').clear().type(downPayment);

  cy.get('#fromAccountId').find('option').eq(accountIndex).then(option => {
    cy.get('#fromAccountId').select(option.val());
  });
});

// Submit form
Cypress.Commands.add('submitRequestLoan', () => {
  cy.get('[colspan="2"] > .button').click();
});

// Assert success
Cypress.Commands.add('assertRequestLoanSuccess', () => {
  cy.get('#requestLoanResult').should('be.visible');
  cy.get('#requestLoanResult > .title')
    .should('contain.text', 'Loan Request Processed');

  ['Loan Provider', 'Date', 'Status'].forEach((label, i) => {
    cy.get(`.form > tbody > :nth-child(${i + 1}) > [align="right"] > b`)
      .should('contain.text', label);
  });

  cy.get('#loanRequestApproved > :nth-child(1)').should('contain.text', 'Congratulations');
  cy.get('#loanRequestApproved > :nth-child(2)').should('contain.text', 'account number');
});

// Assert error
Cypress.Commands.add('assertRequestLoanError', () => {
  cy.get('#requestLoanError > .title')
    .should('contain.text', 'Error');
  cy.get('#requestLoanError > .error')
    .should('contain.text', 'error');
});
