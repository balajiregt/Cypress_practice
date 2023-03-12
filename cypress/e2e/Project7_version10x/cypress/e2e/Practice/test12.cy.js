describe('sample', () => {
    it('version12- Test1', () => {
        cy.visit('https://automationpanda.com/bdd/') //primary origin
        cy.get('a[href="https://cucumber.io/"]').click() //click the link, which navigates to the new cross origin in new tab
        cy.visit('https://cucumber.io/')//new cross origin
        cy.origin('https://cucumber.io/', () => {  //pass the argument of the secondary origin
            cy.get('.nav-main-toggle').click()
            cy.contains('Learn BDD')
            cy.contains('Try CucumberStudio')
        })
    });
});
