let createdid
describe('ecommerce app chaining operation', () => {

    it('GET-View all existing products', () => {

        cy.request({
            method: 'GET',
            url: 'https://fakestoreapi.com/products',

        }).then((response) => {
            createdid = response.body.id
            cy.log(createdid)
            expect(response.status).equal(200)
            expect(response.body.length).to.eq(20)

        })
    })

    it('POST-create new product', () => {

        cy.request({
            method: 'POST',
            url: 'https://fakestoreapi.com/products',
            
            body: {
                "title": "New films",
                "price": 100.00,
                'description': 'Mens clothing',
                'image': 'test',
                'category':'fashion'
            }

        }).then((response) => {
            createdid = response.body.id
            cy.log(createdid)
            expect(response.status).equal(200)
            expect(response.body).to.have.property('id', createdid)

        })
    })


    it('PUT-update the product', () => {

        cy.request({
            method: 'PUT',
            url: `https://fakestoreapi.com/products/${createdid}`,
            
            body: {
                "title": "New films",
                "price": 50.00,
                'description': 'Mens clothing',
                'image': 'test',
                'category':'fashion'
            }

        }).then((response) => {
            createdid = response.body.id
            cy.log(createdid)
            expect(response.status).equal(200)
            expect(response.body.price).to.eql(50.00)
            expect(response.body.title).to.eql('New films')
            expect(response.body.description).to.eql('Mens clothing')
            expect(response.body.category).to.eql('fashion')

        })
    })

    it('Delete that product', () => {
        cy.request({
            method: 'DELETE',
            url: `https://fakestoreapi.com/products/${createdid}`
        })
            .then((response) => {
                expect(response.status).equal(200)

            })
    })

    it('Get- Assert on the deleted user', () => {
        cy.request({
            method: 'GET',
            url: `https://fakestoreapi.com/products`,

        })
            .then((response) => {
                cy.log(createdid)
                expect(response.status).equal(200)

                let arraylength=response.body.length
                for(let i=0;i<arraylength;i++){
                    cy.log(response.body[i].id)
                    expect(response.body[i].id).not.eq(createdid)
                    cy.log('Array ' + i + ' not having the id as expected')
                }
                
            })
    });

})