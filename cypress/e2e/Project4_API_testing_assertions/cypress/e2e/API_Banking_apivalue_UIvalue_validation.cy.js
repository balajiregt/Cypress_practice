/// <reference types="cypress-xpath" />
describe("sanity bankingapp", () => {
    let ui_balance
    let api_balance
    let api_username
    let username="Thomas"

    it('Prelogin', () => {
        cy.visit('https://qbank.accelq.com')
        cy.xpath('/html/body/div[1]/div[2]/div[1]/div/div[2]/div/div[2]/div/form/div[2]/input[1]')
            .should('have.class', 'active')
            .should('have.attr', 'checked')
            .then(($div) => {
                if ($div) {
                    cy.log('Defautly "Personal Banking" radio is selected, so use the default credentials')
                    cy.get('#qb-username').type('qbankadmin')
                    cy.get('#qb-password').type('pass123')
                    cy.get('.qb-signin-button').click()
                }
                else {
                    cy.log('loggin using "corporate bandking credential')
                }
            })

    })

    it('logging the response username & balance', () => {
        cy.request({
            method: 'POST',
            url: 'https://qbankserver.herokuapp.com/api/login',
            body: {
                username: "qbankadmin",
                password: "pass123"
            }
            
        })
            .should((response) => {
                cy.log(JSON.stringify(response.body))

               api_username= response.body.loginUser.name
               cy.log(api_username)
               
                api_balance = JSON.stringify(response.body.loginUser.total_balance)
                cy.log(api_balance)

            })

    })

    it('asserting ui-username vs api-username, ui-balance vs api-balance', () => {

        //cy.contains('Thomas')
        cy.xpath('/html/body/div[1]/div[2]/div/div/div[2]/div[1]/div[2]/div[1]/div/div[2]').then(($div) => {
            let ui_balance1 = $div.text()
            let ui_balance2 = ui_balance1.replaceAll(' ', '')
            let ui_balance3 = ui_balance2.replaceAll(',', '')
            let ui_balance4 = ui_balance3.replaceAll('\n', '')
            let ui_balance5 = ui_balance4.replaceAll('$', '')
            ui_balance = ui_balance5.split('.')[0]


            cy.log(ui_balance)
            expect(ui_balance).eq(api_balance)
            cy.log('ui_balance equals api_balance')

            expect(username).eq(api_username)
            cy.log('ui_username equals api_username')
        })

    })

    

})