
describe('Revising concepts-globalsqa.com', () => {
    let username = "Harry Potter"
    let depositamt = 2
    let withdrawlamt = 1
    it('Test 1-customerlogin', () => {
        cy.visit('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login')
        cy.get('button[ng-click="customer()"]').click()
        cy.get('select#userSelect').should('contain.text', '---Your Name---')
        cy.get('select#userSelect').select(2).contains(username)
        cy.get('button.btn.btn-default').click()

        //after login verifying user name
        cy.get('span:first-child').then(($div) => {
            const text = $div.text()
            expect(text).to.equal(username)
        })
    });

    it('After login-Deposit', () => {

        cy.get('button[ng-click="deposit()"]').click()

        //verify the depositted amount
        cy.get('strong.ng-binding:nth-child(2)').then(($el) => {
            var balanceamtpresent = parseInt($el.text()) //defaultly balance=0
            cy.log(balanceamtpresent)
            cy.get('input[placeholder="amount"]').type(depositamt)
            cy.get('button[type="submit"]').click()
            expect(balanceamtpresent + depositamt).equal(depositamt) //0+2=2
        }
        )
    });

    it('AFter login-Withdrawl', () => {
        cy.get('.btn.btn-lg.tab[ng-class="btnClass3"]').click()

        //verify the withdrawl amount
        cy.get('strong.ng-binding:nth-child(2)').then(($el) => {
            let balanceamtpresent = parseInt($el.text()) //now, balance=2
            cy.log(balanceamtpresent)
            cy.get('div[class="form-group"] label').should('have.text', 'Amount to be Withdrawn :')
            //cy.xpath('//label[normalize-space()="Amount to be Withdrawn :"]').should('be.visible')
            cy.get('input').type(withdrawlamt) // 1
            cy.get('button[type="submit"]').click()
            expect(balanceamtpresent - withdrawlamt).equal(withdrawlamt) //2-1=1
        }
        )
    });
    it('Transactions', () => {
        cy.get('.btn.btn-lg.tab[ng-class="btnClass1"]').click()
        cy.wait(2000)
        cy.get('tr[id="anchor0"] > td:nth-child(3)').should('have.text', 'Credit')
        cy.get('tr[id="anchor0"] > td:nth-child(2)').should('have.text', '2')
        cy.get('tr[id="anchor1"] > td:nth-child(2)').should('have.text', 'Debit')
        cy.get('tr[id="anchor1"] > td:nth-child(3)').should('have.text', '1')
    });

});