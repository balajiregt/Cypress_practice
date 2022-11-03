describe('test to overriding the default viewport values-assign preset values- all test blocks will use the new viewport', () => {
    beforeEach(() => {
        // browser with a 720p monitor
        cy.viewport(1280, 720)
    })
    it('test1', () => {
        cy.visit('https://testproject.io/')
        cy.get('[data-toggle="dropdown"]').should('be.visible')
    });

    it('test2', () => {
        cy.visit('https://testproject.io/')
        cy.get('[data-toggle="dropdown"]').should('be.visible')
    })
});