describe('https://www.limeroad.com/ ', function () {

    it('select a product category; accessing child window-using attr-href; validating sort- discount checkbox functionality', function () {

        const url = new URL("https://www.limeroad.com");
        const urlstring = url.toString(); // should return the URL as a string

        cy.visit('https://www.limeroad.com')
        cy.log(urlstring)
        cy.contains('SHOP MEN').click()
      
        cy.log('Fetch the href attribute target url; Typecast the value to string so that we can concatenate the href url with the baseurl')
        cy.get("a#men_category")
            .should('have.attr', 'href')
            .then(href => {
                const path1 = href.toString()
                cy.log(path1)
                cy.visit(urlstring + href)
            });

        cy.get(':nth-child(6) > .tab').click()
        cy.log('Click the discounts checkbox; Validate the resp text displayed & click the text then the text wont display')
        
    //     cy.get('.mnh40 > :nth-child(2) > .pl36').click() 
    //     cy.get('#filAppliedFilter').should('contain.html', 'upto 20%').click() 
      

    //     cy.get('.mnh40 > :nth-child(3) > .pl36').click()
    //     cy.get('#filAppliedFilter').should('contain.html', '20% - 40%').click()
        

    //     cy.get('.mnh40 > :nth-child(4) > .pl36').click()
    //     cy.get('#filAppliedFilter').should('not.contain.html', '40% - 60%').click()
      

    //     cy.get('.mnh40 > :nth-child(5) > .pl36').click()
    //     cy.get('#filAppliedFilter').should('not.contain.html', '60% - 80%').click()
       

    //     cy.get(':nth-child(6) > .pl36').click()
    //     cy.get('#filAppliedFilter').should('not.contain.html', '80% - 100%').click()
     })
})