import { Given , And , Then , When} from "cypress-cucumber-preprocessor/steps";


Given("Launch the test site",()=>{
cy.visit('https://www.demoblaze.com');
})


Then("Verify login functionality. Enter valid username and password",()=>{
    cy.get('#login2').click()
    cy.wait(10000)
    cy.get('#loginusername').type('admin')
    cy.get('#loginpassword').type('admin')
    cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click()
})

Then("Verify the username after login",()=>{
    cy.contains('Welcome admin', {timeout:20000})
})
