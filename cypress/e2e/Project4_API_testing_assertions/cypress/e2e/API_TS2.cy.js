
it('response validation1 GET method', () => {
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

      expect(response.body.data[length]).to.have.all.keys('id','name','email','gender','status');
      expect(response.body.data[0]).to.have.all.keys('id','name','email','gender','status');
      expect(response.body.data.length).to.be.eq(20)

      expect(response.body).not.to.be.null
    
})
})

it('response validation2 GET method', () => {
  cy.request({
    method: 'GET',
    url: 'https://fakestoreapi.com/products',
    
})
    .should((response2) => {
    expect(response2.body[length]).to.have.all.keys('id','title','price','description','category','image','rating');
    expect(response2.body.length).to.be.eq(20)
    expect(response2.body[0].id).to.eq(1)
    expect(response2.body[length].rating).to.have.all.keys('rate','count')
    
})
})