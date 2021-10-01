describe('Home', () => {
  it('City Actual API', () => {
    cy.visit('/');
    cy.url().should('include', '/#/login');
    cy.get('#username').type('admin').should('have.value', 'admin');
    cy.get('#pwd').type('admin').should('have.value', 'admin');
    cy.contains('Submit').click();
    cy.url().should('include', '/#/home');
    cy.get('p').should('have.length', 2);
    cy.get('img').should('have.length', 2);
    cy.fixture('cities.json').then(
      (cities: { name: string; image: string; alt: string }[]) => {
        cities.forEach((city, index) => {
          cy.get(`:nth-child(${index + 1}) > p`).should('have.text', city.name);
          cy.get(`:nth-child(${index + 1}) > img`)
            .should('have.attr', 'src', `assets/${city.image}`)
            .should('have.attr', 'alt', city.alt)
            .should('be.visible');
        });
      }
    );
  });
  it('City Mock API', () => {
    cy.intercept(
      {
        method: 'GET',
        url: '/cities',
      },
      { fixture: 'cities.json' }
    ).as('getCities');
    cy.visit('/');
    cy.url().should('include', '/#/login');
    cy.get('#username').type('admin').should('have.value', 'admin');
    cy.get('#pwd').type('admin').should('have.value', 'admin');
    cy.contains('Submit').click();
    cy.url().should('include', '/#/home');
    cy.get('p').should('have.length', 2);
    cy.get('img').should('have.length', 2);
    cy.fixture('cities.json').then(
      (cities: { name: string; image: string; alt: string }[]) => {
        cities.forEach((city, index) => {
          cy.get(`:nth-child(${index + 1}) > p`).should('have.text', city.name);
          cy.get(`:nth-child(${index + 1}) > img`)
            .should('have.attr', 'src', `assets/${city.image}`)
            .should('have.attr', 'alt', city.alt)
            .should('be.visible');
        });
      }
    );
  });
});
