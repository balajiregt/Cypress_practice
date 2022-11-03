
describe('API testing scenarios- zoterobib ', () => {
    it('Intercepting the search request', () => {

        //when entering the keyword value for searching the book
        cy.visit('https://zbib.org')
        cy.intercept('POST', 'https://t0guvf0w17.execute-api.us-east-1.amazonaws.com/Prod/search').as('searchapi')
        cy.get('.input-group.input').type('elearning')
        cy.get('.btn.btn-lg.btn-secondary').click().then(() => { //intercepting the searchapi when clicking 'search/Cite' button
            cy.wait('@searchapi').then(interception => {
                const myJSON = (interception.response.body)
                const myJSONString = JSON.stringify(interception.response.body)

                cy.log(myJSON)
                expect(interception.response.statusCode).to.equal(300)
                expect(myJSON).not.to.empty
                expect(myJSONString).to.have.string('eLearning' || 'elearning')

            })
        })


        //when entering the isbn value for searching the book
        cy.visit('https://zbib.org')
        let isbnValue = '9783486580037'
        cy.get('.input-group.input').type(isbnValue)
        cy.get('.btn.btn-lg.btn-secondary').click().then(() => { //intercepting the searchapi when clicking 'search/Cite' button
            cy.wait('@searchapi').then(interception => {
                var myJSON2 = (interception.response.body)
                for (let x in myJSON2[0].creators[0]) {
                    cy.log(x + ": " + myJSON2[0].creators[0][x])
                }
                cy.log(myJSON2)

                //response validations
                expect(interception.response.statusCode).to.equal(200)
                expect(myJSON2[0].ISBN).to.equal(isbnValue)
                expect(myJSON2[0].title).to.have.string('eLearning' || 'elearning')
                expect(myJSON2[0].creators[0].firstName).to.equal('Rolf')
                expect(myJSON2.length).to.be.eq(2)
                expect(myJSON2[0]).to.include.keys('key', 'version', 'itemType', 'ISBN', 'language', 'title', 'numPages', 'place', 'publisher'
                    , 'date', 'libraryCatalog', 'shortTitle')
                expect(myJSON2[1]).to.include.keys('itemType', 'parentItem', 'note')
            })


            //when clicking "Link to this version-Create"
            cy.intercept('POST', 'https://v1snar4wu4.execute-api.us-east-1.amazonaws.com/1').as('createlink')
            cy.get('.btn.btn-lg.btn-outline-secondary.btn-min-width').click().then(() => {
                cy.wait('@createlink').then(interception => {
                    var myJSON3 = (interception.response.body)
                    cy.log(myJSON3)

                    //response validations
                    expect(interception.response.statusCode).to.equal(200)
                    expect(myJSON3).to.have.key('key')
                })
            })

        })

    })

    it('Interception the manual entry', () => {
        cy.visit('https://zbib.org/')
        cy.intercept('GET', 'https://api.zotero.org/itemTypeFields?format=json&itemType=book').as('manualentry')
        cy.get('.btn.btn-sm.btn-outline-secondary').click().then(() => { //intercepting the manualentry api when click 'Manual Entry' button
            cy.wait('@manualentry').then(interception => {
                var myJSON = (interception.response.body)
                cy.log(myJSON)

                //response validations
                expect(interception.response.statusCode).to.equal(200)
                expect(myJSON.length).to.be.eq(22) //the expected json object count is 22 [22 fields]
            })
        })
    });

    it('Interception the manual entry- itemtypescount', () => {
        cy.visit('https://zbib.org/')
        cy.intercept('GET', 'https://api.zotero.org/itemTypeCreatorTypes?format=json&itemType=book').as('manualentry_itemtypeocount')
        cy.get('.btn.btn-sm.btn-outline-secondary').click().then(() => {
            cy.wait('@manualentry_itemtypeocount').then(interception => {
                var myJSON1 = (interception.response.body)
                cy.log(myJSON1)
                expect(interception.response.statusCode).to.equal(200)
                expect(myJSON1.length).to.be.eq(5)  //expected json object count is 5 [5 fields]
                expect(myJSON1[0].creatorType).has.equal('author')
                expect(myJSON1[1].creatorType).has.equal('contributor')
                expect(myJSON1[2].creatorType).has.equal('editor')
                expect(myJSON1[3].creatorType).has.equal('seriesEditor')
                expect(myJSON1[4].creatorType).has.equal('translator')
            })
        })
    });

})

