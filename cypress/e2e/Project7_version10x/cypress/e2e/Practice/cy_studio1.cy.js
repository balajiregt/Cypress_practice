
describe('testing cypress studio', () => {
    it('test1', () => {
        cy.visit('http://www.uitestingplayground.com/sampleapp')
        cy.get('#login').click();
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#loginstatus').should('have.text', 'Invalid username/password');
        cy.get('[name=UserName]').should('have.attr', 'placeholder', 'User Name');
        cy.get('#login').should('have.text', 'Log In');
        cy.get('[name=UserName]').type('test');
        cy.get('[name=Password]').type('pwd');
        cy.get('#login').click();
        cy.get('#loginstatus').should('have.text', 'Welcome, test!');
        cy.get('#login').should('have.text', 'Log Out');
        /* ==== End Cypress Studio ==== */
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#login').click();
        cy.get('#loginstatus').should('have.text', 'User logged out.');
        /* ==== End Cypress Studio ==== */
    });

    /* ==== Test Created with Cypress Studio ==== */
    it.only('test2', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.visit('http://www.uitestingplayground.com');
        cy.get(':nth-child(4) > :nth-child(2) > h3 > a').click();
        cy.get('#login').should('be.visible');
        /* ==== End Cypress Studio ==== */
        /* ==== Generated with Cypress Studio ==== */

        //cypress command
        cy.userInput('test','pwd')
        /* ==== End Cypress Studio ==== */
    });
});