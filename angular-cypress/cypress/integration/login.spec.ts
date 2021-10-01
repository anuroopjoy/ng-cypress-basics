describe('Login', () => {
  it('Login success', () => {
    cy.visit('/');
    cy.url().should('include', '/#/login');
    cy.get('#username').type('admin').should('have.value', 'admin');
    cy.get('#pwd').type('admin').should('have.value', 'admin');
    cy.contains('Submit').click();
    cy.url().should('include', '/#/home');
  });
  it('Empty fields error', () => {
    cy.visit('/');
    cy.url().should('include', '/#/login');
    cy.get('#username').should('have.value', '').as('username');
    cy.get('#pwd').should('have.value', '').as('password');
    cy.contains('Submit').click();
    cy.get('.error').should('have.text', 'Please fill all fields');
    cy.get('@username').type('admin').should('have.value', 'admin');
    cy.get('@password').should('have.value', '');
    cy.contains('Submit').click();
    cy.get('.error').should('have.text', 'Please fill all fields');
    cy.get('@username').clear().should('have.value', '');
    cy.get('@password').type('admin').should('have.value', 'admin');
    cy.contains('Submit').click();
    cy.get('.error').should('have.text', 'Please fill all fields');
  });
  it('Invalid user credentials', () => {
    cy.visit('/');
    cy.url().should('include', '/#/login');
    cy.url().should('include', '/#/login');
    cy.get('#username').type('admin').should('have.value', 'admin');
    cy.get('#pwd').type('1234').should('have.value', '1234');
    cy.contains('Submit').click();
    cy.get('.error').should('have.text', 'Invalid Login');
  });
  it('Login API Failed', () => {
    cy.intercept(
      {
        method: 'POST',
        url: '/login',
      },
      {
        statusCode: 500,
        body: null,
      }
    );
    cy.visit('/');
    cy.url().should('include', '/#/login');
    cy.get('#username').type('admin').should('have.value', 'admin');
    cy.get('#pwd').type('admin').should('have.value', 'admin');
    cy.contains('Submit').click();
    cy.get('.error').should('have.text', 'Login Failed');
  });
});
