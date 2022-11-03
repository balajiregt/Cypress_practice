
class Ecommerce{
    
       homeScreen_signin(){
         cy.get('a.login').click();
        return this 
       }

       username(){
        return cy.get('#email')
       }
       password(){
        return cy.get('#passwd')
        
       }
       
       submit_Button(){
        return cy.get('#SubmitLogin')
       }
       postlogin_topright_username(){
        return cy.get('.account > span')
       }

       postlogin_cartvalue(){
           return cy.get('span.ajax_cart_no_product')
       }
       searchfield_Textbox(){
           return cy.get('#search_query_top')
       }

       searchfield_searchicon(){
        return cy.get('button.button-search')
       }

       postlogin_addtocart_Button()
       {
           return cy.get('a[title="Add to cart"]')
       }
       postlogin_proceedtocheckout_Button(){
           return cy.get('a[title="Proceed to checkout"]')
       }
}
export default Ecommerce