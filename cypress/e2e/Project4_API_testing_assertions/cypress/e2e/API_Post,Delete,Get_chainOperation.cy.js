//https://gorest.co.in/access-token
let tokenvalue = 'de9258d4af357f730c648b4ea86bc5f98b80072ac07e7fcc14b70ca0ce8457ba'
let createdid
describe('sanity bankingapp', () => {

it('POST-Create user, Delete- Created user', () => {

    cy.request({
        method: 'POST',
        url: 'https://gorest.co.in/public/v1/users' + '?' + 'access-token=' + tokenvalue,
        // headers: {
        //   'Authorization': 'Bearer ' + token

        body: {
            "name": "hello world40",
            "gender": "Female",
            "email": "helloworld40@test.com",
            "status": "active"
        }

    }).then((response) => {
        createdid = response.body.data.id
        cy.log(createdid)
        expect(response.status).equal(201)
        expect(response.body.data.name).equal('hello world40')
        expect(response.body.data.email).equal('helloworld40@test.com')
        expect(response.body.data).to.have.property('id', createdid)

    }).then((response) => {
        cy.log(JSON.stringify(response.body))
        cy.log(createdid)
        cy.request({
            method: 'DELETE',
            url: 'https://gorest.co.in/public/v1/users/' + createdid + '?' + 'access-token=' + tokenvalue
        })
            .should((response) => {
                expect(response.status).equal(204)
                cy.log(JSON.stringify(response.body))
                expect(response.body).to.be.empty
                expect(response.body).to.be.empty
            })

    })
})

it('Get- Assert on the deleted user', () => {
    cy.request({
        method: 'GET',
        url: 'https://gorest.co.in/public/v1/users/',

    })
        .should((response) => {
            cy.log(JSON.stringify(response.body))
            cy.log(createdid)
            expect(response.status).equal(200)
            expect(response.body.data).to.not.include(createdid)
        })
});


});
