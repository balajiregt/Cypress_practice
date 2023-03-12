describe('testing blocks of code - using retries', () => {
  
  it('retry test1-globalconfigvalue', () => {
    cy.visit('http://www.uitestingplayground.com/clientdelay')
    cy.contains('Button Triggering Client Side Logic').click()
    cy.get('#content').should('be.visible')
    cy.get('.bg-success').should('have.text','Data calculated on the client side.')
  });

  it('retry test2-localconfigvalue',{
    retries: {
      runMode: 1,
      openMode: 1,
    },
  }, () => {
    Cypress.config('defaultCommandTimeout',15000)
    cy.visit('http://www.uitestingplayground.com/clientdelay')
   // Cypress.config('defaultCommandTimeout',15000)
    cy.contains('Button Triggering Client Side Logic').click()
    cy.get('#content').should('be.visible')
    cy.get('.bg-success').should('have.text','Data calculated on the client side.')
  });
});

