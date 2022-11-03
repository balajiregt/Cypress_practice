describe('test to overriding the default viewport values- common viewport configuration for all the it blocks',
  {
    viewportHeight: 1000,
    viewportWidth: 400,
  },
  () => {
    it('test1', () => {
      cy.visit('https://testproject.io/')
        cy.get('[data-toggle="dropdown"]').should('not.be.visible')
    })

    it('test2', () => {
      cy.visit('https://testproject.io/')
      cy.get('[data-toggle="dropdown"]').should('not.be.visible')
    })
    
  }
)