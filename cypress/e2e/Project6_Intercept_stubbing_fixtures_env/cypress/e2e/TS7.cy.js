describe('Having different viewports for each test blocks', () => {
    it('test1', () => {
        cy.viewport('ipad-2')
        cy.visit('https://testproject.io/')
        cy.get('[data-toggle="dropdown"]').should('not.be.visible')
    });

    it('test2', () => {
        cy.viewport('iphone-6')
        cy.visit('https://testproject.io/')
        cy.get('[data-toggle="dropdown"]').should('not.be.visible')
    });

    it('test3', () => {
        cy.viewport(1280, 720)
        cy.visit('https://testproject.io/')
        cy.get('[data-toggle="dropdown"]').should('be.visible')
    });

    it('test4', () => {
        cy.viewport('iphone-6', 'landscape')
    });
});