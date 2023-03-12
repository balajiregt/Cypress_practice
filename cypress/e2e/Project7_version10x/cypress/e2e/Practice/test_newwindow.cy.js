describe('testtab', () => {

    it('Handling new Browser Window', function() {
        cy.visit('https://alapanme.github.io/testing-cypress.html')
        cy.window().then((win) => {
          cy.spy(win, 'open', url => {
            win.location.href = 'https://the-internet.herokuapp.com/';
          }).as("popup")
        })
        cy.get('button').click()
        cy.get('@popup')
          .should("be.called")
    })

      it('action in new browser window', () => {
        cy.url('https://the-internet.herokuapp.com/')
        cy.get('h1')
        .should('have.text', 'Welcome to the-internet')
      });
          
})