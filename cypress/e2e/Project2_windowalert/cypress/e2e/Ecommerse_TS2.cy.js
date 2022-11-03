const tests=require('../fixtures/example.json')

describe("login Suite", () => {
   
})


it('accessing fixture file array', () => {
    
  tests.forEach(item=> {
    cy.visit('https://www.demoblaze.com');

            cy.get('#login2').click()
            cy.wait(10000)
            cy.get('#loginusername').focus().clear()
            cy.get('#loginusername').type(item.username)
            cy.get('#loginpassword').focus().clear()
            cy.get('#loginpassword').type(item.password)
            cy.log('Body: ' + item.body);
            console.log("Iteration Data n")
            cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click()
            //to validate the alert box string
            cy.on('window:alert', (str) => {
                expect(str).to.equal('Please fill out Username and Password.')
            })
            cy.log('The alert is having the expected text')


            //to click the 'ok' button in the alert box 
            
            cy.log('The alert is having the "ok" button')

            cy.wait(10000)
            cy.get('#logout2').click()
    
    })

});


