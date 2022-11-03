import Ecommerce from 'C:\Users\dell\Desktop\Balaji\Cypress_Practice-master\cypress\e2e\Projects\Project3_POM_childwindow_hrefAttr\cypress\integration\PageObjects\amazonPOM.js'
const com=new Ecommerce() 

describe('http://automationpractice.com//', function () {

  before(function () {
    cy.visit('http://automationpractice.com/')
  })
  let searchitem = 'shirt'

  it('Happy flow of login module', function () {
    com.homeScreen_signin()
    com.username().type('balaji.regt@gmail.com');
    com.password().type('123456');
    com.submit_Button().click()
  })

  it('Validations after logged in', () => {
    com.postlogin_topright_username().should('have.html', 'Tester K')
    cy.get('span.navigation_page').should('have.html', 'My account')
    com.postlogin_cartvalue().should('have.html', '(empty)')
  });

  it('Happy flow of product search', function () {
    cy.get('.icon-home').click()
    com.searchfield_Textbox().type(searchitem)
    com.searchfield_searchicon().click()
    cy.get('span.lighter').should('contain', searchitem)
    com.postlogin_addtocart_Button().click()
    cy.wait(2000)
    com.postlogin_proceedtocheckout_Button().click()

  })

  it('Happy flow within cart and cart validations', function () {
    let cartitemscount = cy.get('span.ajax_cart_quantity').should('have.html', '1')
    let itemscountInsubTotal = cy.get('input.cart_quantity_input').should('have.value', '1')
    if (cartitemscount = itemscountInsubTotal) {
      cy.log('The cart count matches with the order summary quantity')
    }

    cy.get('p.product-name')
    .then(($div) => {
      const productname = $div.text()
      cy.log(productname)
      expect(productname).to.contain(searchitem)
      cy.log('The order summary product name matches with the product search text')
    })

  })
})







