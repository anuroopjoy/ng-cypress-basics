describe('Home Tests', () => {
  it('Home Test Actual API', () => {
    cy.visit('/#/home');
    cy.url().should('include', '/#/home');
    cy.fixture('cities.json').then(
      (cities: { name: string; image: string; alt: string }[]) => {
        cy.get('p').should('have.length', cities.length);
        cy.get('img').should('have.length', cities.length);
        cities.forEach((city, index) => {
          cy.get(`:nth-child(${index + 1}) > p`)
            .should('be.visible')
            .should('have.text', city.name);
          cy.get(`:nth-child(${index + 1}) > img`)
            .should('be.visible')
            .should('have.attr', 'src', `assets/${city.image}`)
            .should('have.attr', 'alt', city.alt);
        });
      }
    );
  });
  it('Home Test Mock API', () => {
    cy.intercept(
      {
        method: 'GET',
        url: '/cities',
      },
      {
        fixture: 'cities.json',
      }
    ).as('getCities');
    cy.visit('/#/home');
    cy.url().should('include', '/#/home');
    cy.fixture('cities.json').then(
      (cities: { name: string; image: string; alt: string }[]) => {
        cy.get('p').should('have.length', cities.length);
        cy.get('img').should('have.length', cities.length);
        cities.forEach((city, index) => {
          cy.get(`:nth-child(${index + 1}) > p`)
            .should('be.visible')
            .should('have.text', city.name);
          cy.get(`:nth-child(${index + 1}) > img`)
            .should('be.visible')
            .should('have.attr', 'src', `assets/${city.image}`)
            .should('have.attr', 'alt', city.alt);
        });
      }
    );
  });
});
