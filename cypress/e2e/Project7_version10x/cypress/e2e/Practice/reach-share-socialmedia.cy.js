it.skip('Handling New Window- twitter', function () {
        cy.visit('https://automatenow.io/sandbox-automation-testing-practice-website/');
        const twitterurl='https://automatenow.io/sandbox-automation-testing-practice-website/?share=twitter&nb=1'
        cy.window().then(win => {
          cy.stub(win, 'open').as('windowOpen');
        });
        cy.get('li[class="share-twitter"]').click();
        cy.get('@windowOpen').should('be.calledWith', twitterurl);
        cy.window().then(win => {
          win.location.href = twitterurl;
        });
        cy.contains('need to log in before you can share that Tweet.',{timeout:8000})
        cy.contains('Log in').click({ force: true })
      })

it('Handling New Window- facebook', function () {
        cy.visit('https://automatenow.io/sandbox-automation-testing-practice-website/');
        const facebookurl='https://automatenow.io/sandbox-automation-testing-practice-website/?share=facebook&nb=1'
        cy.window().then(win => {
          cy.stub(win, 'open').as('windowOpen');
        });
        cy.get('li[class="share-facebook"]').click();
        cy.get('@windowOpen').should('be.calledWith', facebookurl);
        cy.window().then(win => {
          win.location.href = facebookurl;
        });
        cy.get('.fb_logo').should('be.visible')
        //cy.contains('Log in').click({ force: true })
      })

it('Handling New Window2- facebook', function () {
        cy.visit('https://automatenow.io/sandbox-automation-testing-practice-website/');
        cy.window().then(win => {
          cy.stub(win, 'open').as('windowOpen');
        });
        cy.get('li[class="share-facebook"]').click();
        cy.get('@windowOpen').should('be.called');
        // cy.contains('Log in to your Facebook account to share')
        // cy.contains('Log in').click({ force: true })
      })

      
