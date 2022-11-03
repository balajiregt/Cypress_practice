describe("prelogin Suite", () => {


    it('Verify error message when username or email address alone is entered', () => {
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

    it('validate password field and then enter password ', () => {
        cy.get('#loginpassword').should('be.empty')
    });

})
