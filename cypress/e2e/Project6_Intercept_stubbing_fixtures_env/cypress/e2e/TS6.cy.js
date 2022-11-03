//array of different viewports
const sizes = ['iphone-6', 'ipad-2', 'samsung-s10']

describe('test to overriding the default viewport values- applying the array of viewports-to all test blocks', () => {
  // iterating the array of different viewports
  sizes.forEach((array) => {
    it(`Should launch on ${array} screen`, () => {
      cy.viewport(array)
      cy.wait(5000)
      cy.visit('https://testproject.io/')
      cy.get('[data-toggle="dropdown"]').should('not.be.visible')
     console.log('Menu Item "Platform" is not visible')
     console.log('Mobile viewport for: ' + array);
    })

  })
    it('setting the view port in test block level', () => {
      cy.viewport(1024, 768)
      cy.wait(5000)
      cy.visit('https://testproject.io/')
      cy.get('[data-toggle="dropdown"]').should('be.visible')
      console.log('Menu Item "Platform" is not visible')
      console.log('Mobile viewport for custom width-height');
    });
 
})