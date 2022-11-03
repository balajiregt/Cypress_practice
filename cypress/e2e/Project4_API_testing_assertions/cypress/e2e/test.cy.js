it('response validation1 GET method', () => {
    cy.request({
        method: 'GET',
        url: 'https://gorest.co.in/public/v1/users',
    })
        .should((response) => {

            let i
            var count
            expect(response.body).haveOwnProperty('meta')
            expect(response.body).haveOwnProperty('data')
            expect(response.body.meta).haveOwnProperty('pagination')
            expect(response.body.meta.pagination).haveOwnProperty('total')
            expect(response.body.meta.pagination).haveOwnProperty('pages')
            expect(response.body.meta.pagination).haveOwnProperty('page')
            expect(response.body.meta.pagination).haveOwnProperty('limit')
            expect(response.body.meta.pagination).haveOwnProperty('links')
            expect(response.body.meta.pagination.links).haveOwnProperty('previous')
            expect(response.body.meta.pagination.links).haveOwnProperty('current')
            expect(response.body.meta.pagination.links).haveOwnProperty('next')

            expect(response.body.data[length]).to.have.all.keys('id', 'name', 'email', 'gender','status');
            expect(response.body.data[9]).to.have.all.keys('id', 'name', 'email', 'gender', 'status');
            expect(response.body.data.length).to.be.eq(10)
            expect(response.body).not.to.be.null
            var count = response.body.data.length
            cy.log(count)
           
            for (let i = 0; i < count; i++){
                expect(response.body.data[i]).to.have.all.keys('id', 'name', 'email', 'gender', 'status')
                cy.log('Array' + i + ' is having the expected properties')
            }
            
        })
})

it('asserting response property (string) within an array', () => {
    cy.request({
        method: 'GET',
        url: 'https://gorest.co.in/public/v1/users',
    })
        .should((response) => {
    
            let res=response.body.data[0].name
            cy.log(res)
            //expect(res).equal('Dhanalakshmi Jha')
            //expect(response.body.data[0]).to.have.own.property('name','Dhanalakshmi Jha')
            expect(response.body.data.length).to.eq(10)
            expect(response.body.data).to.be.an('array').that.is.not.empty;
            expect(response.body.data).to.be.an('array').that.is.empty;
        })
})

it('asserting response property (string) within an array2', () => {
    cy.request({
        method: 'GET',
        url: 'https://gorest.co.in/public/v1/users',
    })
        .should((response) => {
    
            var arraylength = response.body.data.length
            cy.log('Array length is ',arraylength)
            expect(response.body.data.length).to.be.eq(arraylength)

        for (let i = 0; i < arraylength; i++) {
          expect(response.body.data[i]).to.have.all.keys('id', 'name', 'email', 'gender', 'status')
          cy.log('Array ' + i + ' is having the expected properties')
          cy.log('id value is ' +response.body.data[i].id )
        }
      })
  })

