import { Given , And , Then , When} from "cypress-cucumber-preprocessor/steps";

Given("I open Google page & I validate the Search button attributees",() => {
        cy.visit('https://www.google.in')
        cy.get('.gLFyf').
            should('have.attr','role','combobox').
            should('have.attr','aria-label','Search')
    
    })  
    
When("Enter some text in the search field and click enter", () => {
        cy.get('.gLFyf')
        .type('entering values in cypress')
        .type('{enter}')
    });

And("I finally verify search results are returned or not", () => {
    cy.get('#result-stats').should('contain.text','results').
    should('contains.text','About')
    cy.get('nobr').should('not.be.empty')
    
}) 

Then("Verify that by default the 'All' tab is selected, Verify the color property is blue",() => {
cy.get('div[class="hdtb-mitem hdtb-msel"]').should('contain.text','All')
cy.get('.hdtb-mitem.hdtb-msel').should('have.css','color','rgb(26, 115, 232)')
})

Then("Verify the 'Tool' button and the dynamic filters 'AnyTime', 'All results'",() => {
cy.get('#hdtb-tls').click();
cy.get('#hdtbMenus').
should('contain.text','Any time').
should('contain.text','All results')
})