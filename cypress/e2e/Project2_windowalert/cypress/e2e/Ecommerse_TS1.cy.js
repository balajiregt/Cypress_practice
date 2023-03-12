
it.skip('Test01: Verify error message when username or email address alone is entered', () => {
        cy.visit('https://www.demoblaze.com');
        cy.get('#login2').click()
        cy.get('#loginusername').type('admin')
        cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click()
        
        //to validate the alert box string
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Please fill out Username and Password.')
        })
        cy.log('The alert is having the expected text')

        //to click the 'ok' button in the alert box 
        cy.on('window:confirm', () => true);
        cy.log('The alert is having the "ok" button')  
        
    });

it.skip('Test02', () => {
       cy.visit('https://demoqa.com/alerts')
       cy.get('#alertButton').click()
       cy.on('window:confirm', () => true);
       cy.log('The alert is having the "ok" button')  

    });

it.skip('Test03: click- Cancel', () => {
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')
        cy.get('button[onclick="jsPrompt()"]').click()
        cy.window().then(win => {
            cy.stub(win, 'prompt').callsFake(() => null);
 
     });

})

it('Test04: enter prompt text- click OK', () => {
    cy.visit('https://the-internet.herokuapp.com/javascript_alerts')
    cy.window().then(win => {
        cy.stub(win, 'prompt').returns('This is a test text')
        cy.contains('Click for JS Prompt').click()
      })
      cy.get('#result').should('have.text', 'You entered: This is a test text')
});
