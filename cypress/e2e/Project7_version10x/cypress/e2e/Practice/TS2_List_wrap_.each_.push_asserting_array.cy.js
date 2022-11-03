describe('sanity title', () => {

    it('flipkart test- using wrap assertion', () => {
        /*    var items = []
            let count
    
            cy.visit('https://www.amazon.in/')
            cy.scrollTo(303, 1203)
            cy.wait(3000)
            //cy.contains('See all deals').click()
            cy.get('div[class="a-section a-spacing-none feed-carousel first-carousel"] ul[role="list"] li')
    
                .then(($el) => {
                    count = $el.length //using .length to capture the list count
                    expect(count).eq(count)
                    cy.log('Todays deals list count is ' + count)
                    console.log('Todays deals list count is ' + count)
                })
    
                .each(($el) => {
                    items.push($el.text()) //pushing each list text to the defined array 
                    cy.log($el.text())
                    console.log($el.text())
    
                    //accessing the yielded object (items) using (wrap()) based on the index using (its)
                    cy.wrap(items).its(0).should('contain', 'Clearance sale')
                    //cy.wrap(items).its(count-1).should('contain','Bigmuscles Nutrition Crude Whey 2kg, Whey Protein Concentrate 80%, 24g Protein, 5.5g BCAA, 4 g Glutamine')
                    //cy.wrap(items).its(29).should('contain','Bigmuscles Nutrition Crude Whey 2kg, Whey Protein Concentrate 80%, 24g Protein, 5.5g BCAA, 4 g Glutamine')
                })
    
                */

        let searchitem = 'APPLE'
        let itemlength = ''
        let product = []
        let count = 1
        cy.visit('https://www.flipkart.com/')
        cy.get('input[placeholder="Search for products, brands and more"]').type(searchitem).type('{enter}')

        cy.get('.col.col.col-7-12 > div:first-child')
            .wait(5000)
            .then(($el) => {
                itemlength = $el.length
            })

        cy.get('.col.col.col-7-12 > div:first-child')
            .each(($el) => {  //iterating the elements through the yielded subject
                cy.log($el.text())
                product.push($el.text())

                //chaining previous commands
                cy.then(() => {
                    expect(product).to.be.not.empty
                })
            })

        while (count <= itemlength) {
            cy.wrap(product).its(count).should('include', searchitem)
            count++;
            cy.log('wrap assertion passes')
        }


    })

    it('amazon test2', () => {

        let searchitem = 'iPhone 13'
        let countitem = ''
        // let wrongproduct=[]
        cy.visit('https://www.amazon.in/')
        cy.get('.nav-search-field').type(searchitem).type('{enter}')
        cy.get('div[data-component-type="s-search-result"] a >span[class$="a-size-medium a-color-base a-text-normal"]')
            .each(($el) => {
                countitem = $el.length
                cy.log($el.text())
                    //expect($el.text()).to.include(searchitem)

                    .then(($el) => {

                        // assert on the text
                        if ($el.text().includes(searchitem)) {
                            // do your statements
                            cy.log('Product listed is correct')

                        } else {
                            // do other statements
                            cy.log('Product listted is incorrect')
                        }
                    })
            });
    })

    it.only('Array list iterate- conditional assertion', () => {

        let searchitem = 'Tank'
        let itemlength = ''
        let correctproduct = []
        let wrongproduct = []
        cy.visit('https://magento.softwaretestingboard.com/')
        cy.get('#ui-id-5').click()
        cy.get('div[class="block filter"] li:nth-child(1) a:nth-child(1)').click()
        cy.get('.product.name.product-item-name a')
            .then(($el) => {
                itemlength = $el.length
            })
            .each(($el) => {  //iterating the elements through the yielded subject
                cy.log($el.text())
                    .then(($el) => {   //chaining the previous commands and perform the sequence of actions
                        // assert on the text
                        if ($el.text().includes(searchitem)) {
                            // pushing 1 to the array. so that we can find the length of the array.
                            correctproduct.push(1)
                            cy.log('Expected product is listed')
                            console.log('Expected product is listed')

                        } else {
                            // pushing 0 to the array. so that we can find the length of the array.
                            wrongproduct.push(0)
                            cy.log('Not expected product')
                        }
                    })
            });

        //using wrap, so that we can log the yielded/pushed values.
        //when not using wrap, we will be logging the array itself
        cy.wrap(correctproduct)
        cy.wrap(wrongproduct)

        //chaining previous commands, now assert on the 'correctproduct'/ 'wrongproduct'
        cy.then(() => {
            let countarray = correctproduct.length
            expect(countarray).to.eq(itemlength)
            expect(wrongproduct).to.be.empty
        })

    })
})
