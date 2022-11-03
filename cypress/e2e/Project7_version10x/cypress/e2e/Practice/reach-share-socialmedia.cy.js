describe('', () => {
    it('facebook window open', () => {
        cy.visit('https://staging.directshifts.com/jobs/p/physicians-hospital-telehealth-openings-9057', {
            onBeforeLoad(win) {
                cy.spy(win, 'open')
            }
        })
        
        // Do the action in your app like cy.get('.open-window-btn').click()
        cy.get('.t-container-1 > button').eq(1).click()
        cy.screenshot()
        cy.window().its('open').should('be.called')
        

    });

    it('linkedin window open', () => {
        cy.visit('https://staging.directshifts.com/jobs/p/physicians-hospital-telehealth-openings-9057', {
            onBeforeLoad(win) {
                cy.spy(win, 'open')
            }
        })
        
        // Do the action in your app like cy.get('.open-window-btn').click()
        cy.get('.t-container-1 > button').eq(2).click()
        cy.screenshot()
        cy.window().its('open').should('be.called')

    })



    it('whatsapp window open', () => {
        cy.visit('https://staging.directshifts.com/jobs/p/physicians-hospital-telehealth-openings-9057', {
            onBeforeLoad(win) {
                cy.spy(win, 'open')
            }
        })
        
        // Do the action in your app like cy.get('.open-window-btn').click()
        cy.get('.t-container-1 > button').eq(4).click()
        cy.screenshot()
        cy.window().its('open').should('be.called')
    });

    it('twitter window open', () => {
        cy.visit('https://staging.directshifts.com/jobs/p/physicians-hospital-telehealth-openings-9057', {
            onBeforeLoad(win) {
                cy.spy(win, 'open')
            }
        })

        // Do the action in your app like cy.get('.open-window-btn').click()
        cy.get('.t-container-1 > button').eq(3).click()
        cy.screenshot()
        cy.window().its('open').should('be.called')
    });


})

