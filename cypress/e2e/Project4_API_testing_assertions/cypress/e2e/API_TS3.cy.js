//https://gorest.co.in/access-token
const tokenvalue = Cypress.env('GOREST_TOKEN');
before(() => { if (typeof tokenvalue !== 'string' || !tokenvalue) throw new Error('Set GOREST_TOKEN in your local test environment'); });
let createdid

it('POST-Create user, Delete- Created user', () => {

    cy.request({
        log: false,
        headers: { Authorization: 'Bearer ' + tokenvalue },
        method: 'POST',
        url: 'https://gorest.co.in/public/v1/users',
        // headers: {
        //   'Authorization': 'Bearer ' + token

        body: {
            "name": "hello world24",
            "gender": "male",
            "email": "helloworld24@testcom",
            "status": "active"
        }

    }).then((response) => {
        createdid = response.body.data.id
        cy.log(createdid)
        expect(response.status).equal(201)
        expect(response.body.data.name).equal('hello world24')
        expect(response.body.data.email).equal('helloworld24@testcom')
        expect(response.body.data).to.have.property('id', createdid)

    }).then((response) => {
        cy.log(JSON.stringify(response.body))
        cy.log(createdid)
        cy.request({
        log: false,
        headers: { Authorization: 'Bearer ' + tokenvalue },
            method: 'DELETE',
            url: 'https://gorest.co.in/public/v1/users/' + createdid
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
        log: false,
        headers: { Authorization: 'Bearer ' + tokenvalue },
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




