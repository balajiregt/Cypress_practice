describe('UI scenarios', () => {

    it('verify that searched keyword related books are displayed', () => {
        var items = []
        let count

        cy.visit('https://zbib.org/')
        cy.contains('ZoteroBib')
        cy.get('.input-group.input').type('business')//enter the keyword
        cy.get('.btn.btn-lg.btn-secondary').click()  //click the search button
        cy.wait(7000)
        cy.get('ul.results > li').then(($el) => {
            count = $el.length //using .length to capture the list count
            cy.log('Default result list count is ' + count)
            console.log('Default result list count is ' + count)
        })

            .each(($el) => {
                items.push($el.text()) //pushing each list text to the defined array 
                cy.log(items)
                console.log($el.text())
                /*cy.wrap(items).its(0).should('contain', 'Business')
                cy.wrap(items).its(1).should('contain','Business')
                cy.wrap(items).its(2).should('contain','Business')*/
                expect($el.text()).to.contain('Business')  //validate each list element is containing the search keyword
            })
    });


    it('select any book and verify that the selected book is available in your personalised bibliography', () => {
        var selectedbook = ""
        var listedbibliography = ""
        cy.visit('https://zbib.org/')
        cy.contains('ZoteroBib')
        cy.get('.input-group.input').type('business')
        cy.get('.btn.btn-lg.btn-secondary').click()
        cy.wait(7000)
        cy.get('li:first-child > h5 > span.title-container').click().then(($el) => {
            selectedbook = $el.text()    //assign the clicked book text{from the search list page} to the defined variable
            cy.log(cy.wrap(selectedbook)) //wrap the variable
        })
        cy.get('ul.bibliography > li > div > div.csl-entry').then(($el) => {
            listedbibliography = $el.text() //assign the listed book text{from the home page} to the defined variable
            cy.log(cy.wrap(listedbibliography)) //wrap the variable

        })

        cy.then(() => {
            expect(listedbibliography.toLowerCase()).to.have.string(selectedbook.toLowerCase()) //validate the listed book text to match the text of the book clicked in the list page
        })

    });

    it('Edit the selected book- then verify it is updated or not', () => {
        var updatedtext_shortTitle = 'edit'

        cy.visit('https://zbib.org/')
        cy.get('.input-group.input').type('business')
        cy.get('.btn.btn-lg.btn-secondary').click()
        cy.wait(7000)
        cy.get('li:first-child > h5 > span.title-container').click()

        cy.get('.btn.btn-secondary.btn-min-width').click() //clicking 'Edit' button
        cy.get('#shortTitle').type(updatedtext_shortTitle) //Enter new text in the 'shortTitle' field
        cy.get('.modal-header > .btn').click() //click 'DONE' button
        cy.get('ul.bibliography').click() //again click the "Edit" button
        cy.get('#shortTitle').should('have.value', 'Strategy' + updatedtext_shortTitle) //verify the 'shortTitle' field is having the updated text
        cy.get('.modal-header > .btn').click()//click 'DONE' button
        cy.wait(5000)


    });


    it('Delete all the listed bibliography and verify', () => {

        cy.visit('https://zbib.org/')
        cy.get('.input-group.input').type('business')
        cy.get('.btn.btn-lg.btn-secondary').click()
        cy.wait(7000)
        cy.get('li:first-child > h5 > span.title-container').click()

        cy.get('button.btn.btn-sm.btn-outline-primary').click()  //Delete all the seleted book
        cy.get('button[class="btn btn-secondary"]').click() //confirm the deletion
        cy.wait(5000)

        cy.get('.section.section-bibliography.empty > div > h2.empty-title').scrollIntoView() //verify that the bibliography container is empty
    });

    it('select the book- create bibliograpgy- view bibliography', () => {
        cy.visit('https://zbib.org/')
        cy.get('.input-group.input').type('business')
        cy.get('.btn.btn-lg.btn-secondary').click()
        cy.wait(7000)
        cy.get('li:first-child > h5 > span.title-container').click()

        cy.get('button.btn.btn-lg.btn-outline-secondary.btn-min-width').click() //click 'Create" button
        cy.get('a.btn').click()//click 'View' button

    });

    it('select the book- copy the url- clear existing bibliography', () => {

        cy.visit('https://zbib.org/')
        cy.get('.input-group.input').type('business')
        cy.get('.btn.btn-lg.btn-secondary').click()
        cy.wait(7000)
        cy.get('li:first-child > h5 > span.title-container').click()

        cy.get('button.btn.btn-lg.btn-outline-secondary.btn-min-width').scrollIntoView().click() //click the "Create" button
        cy.get('.message > .btn-icon').click() //click "close" icon from the frame
        cy.wait(5000)

        cy.get('.permalink-tools > button.btn').should('have.attr', 'data-clipboard-text') // verify the "Copy url" attribute to access the newurl
            .then(text => {
                const newpath = text.toString()
                cy.log(newpath)
                cy.visit(newpath)
            });

        cy.get('.bibliography.read-only') //verify the readonly class is available
        cy.get('button.btn.btn-sm.btn-outline-secondary.btn-edit-bibliography').click() //click the 'Edit bibliography' button
        cy.wait(5000)
        cy.get('.modal-title').should('have.text', 'Clear existing bibliography?')

        cy.get('button.btn.btn-secondary:last-child').click() //click 'continue' button
        cy.url().should('eq', 'https://zbib.org/') //verify the webpage is landing in the default url

    });

});