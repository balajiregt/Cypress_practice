describe('capturing list title', () => {
    
    it('amazon test1', () => {
        var items = []
        let count
       
        cy.visit('https://www.amazon.in/')
        cy.scrollTo(303, 1203)
        cy.wait(3000)
        //cy.contains('See all deals').click()
        cy.get('#desktop-1 .a-section.feed-carousel-viewport > ul > li:first-child').click()
        cy.get('#octopus-dlp-asin-stream > ul > li') 
          .then(($el) => {
            count= $el.length //using .length to capture the list count
            expect(count).eq(count)
            cy.log('Todays deals list count is ' +count)
            console.log('Todays deals list count is ' +count)
           })

           .each(($el) => {
            items.push($el.text()) //pushing each list text to the defined array 
            cy.log($el.text())
            console.log($el.text())

            //accessing the yielded object (items) using (wrap()) based on the index using (its)
            cy.wrap(items).its(0).should('contain', 'Bigmuscles Nutrition Premium Gold Whey 1Kg Whey Protein Isolate Blend, Labdoor USA certified, 25g Protein Per Serving')
            cy.wrap(items).its(count-1).should('contain','Bigmuscles Nutrition Crude Whey 2kg, Whey Protein Concentrate 80%, 24g Protein, 5.5g BCAA, 4 g Glutamine')
            cy.wrap(items).its(29).should('contain','Bigmuscles Nutrition Crude Whey 2kg, Whey Protein Concentrate 80%, 24g Protein, 5.5g BCAA, 4 g Glutamine')
          })
          
         
    });
});