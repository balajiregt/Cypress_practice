/// <reference types="cypress" />

describe('sanity bankingapp', () => {

  it('response validation1 GET method-Iterate and validate the properties', () => {
    cy.request({
      method: 'GET',
      url: 'https://gorest.co.in/public/v1/users',
    })
      .should((response) => {

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
        expect(response.body).not.to.be.null

        var count = response.body.data.length
        cy.log(count)
        expect(response.body.data.length).to.be.eq(count)

        for (let i = 0; i < count; i++) {
          expect(response.body.data[i]).to.have.all.keys('id', 'name', 'email', 'gender', 'status')
          cy.log('Array ' + i + ' is having the expected properties')
        }
      })
  })

  it('response2 validation GET method- validate the keys-keys count', () => {
    cy.request({
      method: 'GET',
      url: 'https://fakestoreapi.com/products',

    })
      .should((response2) => {
        expect(response2.body[length]).to.have.all.keys('id', 'title', 'price', 'description', 'category', 'image', 'rating');
        expect(response2.body.length).to.be.eq(20)
        expect(response2.body[0].id).to.eq(1)
        expect(response2.body[length].rating).to.have.all.keys('rate', 'count')

      })

  })

  it('response3 validation-looping the response array and capturing the length property value and checking the array is empty or not using conditional statements', () => {
    cy.request({
      method: 'POST',
      url: 'https://qbankserver.herokuapp.com/api/login',
      body: {
        username: "qbankadmin",
        password: "pass123"
      }
    })
      .should((response3) => {
        let accountsvalue
        let lengthvalidate_var

        accountsvalue = response3.body.loginUser.accounts.length
        for (let i = 0; i < accountsvalue; i++) {
          lengthvalidate_var = response3.body.loginUser.accounts[i].transactions.length
          cy.log(lengthvalidate_var)
          if (lengthvalidate_var >= 1) {
            cy.log(response3.body.loginUser.accounts[i].transactions + ' is not empty')
          }
          else {
            cy.log(' is empty, there is no transactions response data')
          }
        }
      })
  })


  it('response4 validation- storing the accounts-transaction length-and asserting the returned value ', () => {
    cy.request({
      method: 'POST',
      url: 'https://qbankserver.herokuapp.com/api/login',
      body: {
        username: "qbankadmin",
        password: "pass123"
      }
    })

      //by storing the response in an array and then validating the array, will resolve the above issue
      .should((response5) => {
        let transaction_arr = []
        let accountsvalue = response5.body.loginUser.accounts.length
        for (let l = 0; l < accountsvalue; l++) {
          transaction_arr.push(response5.body.loginUser.accounts[l].transactions.length)
          cy.log(transaction_arr[l])
        }
        expect(transaction_arr).to.contain(0)
        expect(transaction_arr).to.contain(1)
      })
  })

});

