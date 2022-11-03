describe('intercepting-stubbing-validating dynamic elements', () => {
  var stubbedfavcount = 1000
  var stubbedcomments = 1001

  it('test1-intercept-spying: to assert the pagination visibility', function () {
    // Matching URL
    cy.intercept('GET', 'https://api.realworld.io/api/articles?limit=10&offset=0').as('userarticles')
    cy.visit('https://demo.realworld.io/#/', { timeout: 5000 })
    //asserting the intercepted endpoint
    cy.wait('@userarticles').then((interception) => {
      cy.log(JSON.stringify(interception))
      cy.log(interception.response.body)
      expect(interception.response.body.articlesCount).to.equal(163)
      expect(interception.response.statusCode).to.equal(200)
      //assert the pagination class is visible. This is visible when the 'article-list' is > 10.
      cy.get('ul.pagination').should('be.visible')
    })

  });

  it('test2-intercept-stubbing: empty array-to assert the pagination visibility', () => {
    cy.intercept('GET', 'https://api.realworld.io/api/articles?limit=10&offset=0', { fixture: 'stub2.json' }).as('userarticles')
    cy.visit('https://demo.realworld.io/#/')

    cy.wait('@userarticles').then((interception2) => {
      cy.log(JSON.stringify(interception2))
      expect(interception2.response.body.articles).to.be.empty

      //assert the text is available, since 'articles-list' is empty
      cy.contains('No articles are here... yet.')
      expect(interception2.response.statusCode).to.equal(200)

      //assert the pagination class is visible. This is visible when the 'article-list' is > 10.
      cy.get('ul.pagination').should('not.be.visible')
    })
  });


  it('test3-intercept-stubbing: less than 10 array', () => {
    cy.intercept('GET', 'https://api.realworld.io/api/articles?author=testbalaji&limit=5&offset=0', { fixture: 'stub3.json' }).as('userarticles')
    cy.visit('https://demo.realworld.io/#/', { timeout: 5000 })
    cy.contains('Sign in').click()
    cy.get('input[placeholder="Email"]').type('balaji.regt@gmail.com')
    cy.get('input[placeholder="Password"]').type('Testing@15071989')
    cy.get('.btn', { timeout: 5000 }).click()
    cy.contains('testbalaji').click()

    //asserting the intercepted endpoint
    cy.wait('@userarticles').then((interception2) => {
      cy.log(JSON.stringify(interception2))
      cy.log(interception2.response.body)
      expect(interception2.response.statusCode).to.equal(200)
      //assert the pagination class is visible. This is visible when the 'article-list' is > 10.
      cy.get('ul.pagination').should('not.be.visible')
    });

  })

  it('test4-intercept-stubbing: favorites & favorite flag=true', () => {
    cy.intercept('https://api.realworld.io/api/articles/**105578', { fixture: 'favourite.json' }).as('favourites')
    cy.visit('https://demo.realworld.io/#/', { timeout: 5000 })
    cy.contains('Sign in').click()
    cy.get('input[placeholder="Email"]').type('balaji.regt@gmail.com')
    cy.get('input[placeholder="Password"]').type('Testing@15071989')
    cy.get('.btn', { timeout: 5000 }).click()
    cy.contains('Global Feed').click()
    cy.get('article-preview[article="article"]').eq(1).click()

    cy.wait('@favourites').then((interception2) => {
      cy.log(JSON.stringify(interception2))
      cy.log(interception2.response.body)
      expect(interception2.response.statusCode).to.equal(200)
      expect(interception2.response.body.article.favorited).to.equal(true)
      expect(interception2.response.body.article.favoritesCount).to.equal(stubbedfavcount)
    });
    cy.contains('Unfavorite Article').should('be.visible')
  })

  it('test5-intercept-stubbing: Unfavorite flag=false', () => {
    cy.intercept('https://api.realworld.io/api/articles/**105578', { fixture: 'unfavorite.json' }).as('unfavourites')
    cy.visit('https://demo.realworld.io/#/', { timeout: 5000 })
    cy.contains('Sign in').click()
    cy.get('input[placeholder="Email"]').type('balaji.regt@gmail.com')
    cy.get('input[placeholder="Password"]').type('Testing@15071989')
    cy.get('.btn', { timeout: 5000 }).click()
    cy.contains('Global Feed').click()
    cy.get('article-preview[article="article"]').eq(1).click()

    cy.wait('@unfavourites').then((interception2) => {
      cy.log(JSON.stringify(interception2))
      cy.log(interception2.response.body)
      expect(interception2.response.statusCode).to.equal(200)
      expect(interception2.response.body.article.favorited).to.equal(false)
      expect(interception2.response.body.article.favoritesCount).to.equal(stubbedfavcount)
    });

    cy.contains('Favorite Article').should('be.visible')

  }),

    it('test6-intercept-stubbing: comments', () => {
      //Cypress.config('responseTimeout', 5000)
      cy.intercept('GET', 'https://api.realworld.io/api/articles/Quos-unde-hic-id-doloribus-labore-sit-sed-aut-fugiat-aliquid-dicta-fugiat-labore-doloribus-laborum-sed-magnam-quaerat-occaecati-hic-possimus-voluptate-labore-magnam-possimus-sunt-maiores-ducimus-neque-sequi-blanditiis-sunt-quos-occaecati-excepturi-facilis-blanditiis.-Unde-at-tenetur-quas-hic-esse-ducimus-doloribus-tenetur-facilis-repellat-doloribus-excepturi-excepturi-aliquid-voluptatibus-sunt-necessitatibus-consequuntur-laborum-neque-nostrum-necessitatibus-nihil-et-nemo-enim-quasi-labore-beatae-ullam-id-est-excepturi-consequuntur-nostrum-nulla-in-hic-asperiores.-Aut-maiores-quas-consequuntur-voluptatem-enim-est-exercitationem-quasi-sed-quaerat-reiciendis-consectetur-nostrum-rerum-ducimus-id-nemo-magnam-cupiditate-blanditiis-magnam-voluptatibus-reiciendis-quaerat-voluptate-excepturi-esse-unde-hic.-Vitae-quia-id-esse-voluptatibus-nihil-nihil-eos-vitae-dolores-quos.-Cupiditate-fugiat-occaecati-ipsum-necessitatibus-consequuntur.-105578/comments', { fixture: 'comments.json' }).as('comments')
      cy.visit('https://demo.realworld.io/#/', { timeout: 5000 })
      cy.get('article-preview[article="article"]').eq(0).click()
      cy.wait('@comments').then((interception2) => {
        cy.log(JSON.stringify(interception2))
        cy.log(interception2.response.body)
        expect(interception2.response.statusCode).to.equal(200)
        expect(interception2.response.body.comments).to.have.lengthOf(stubbedcomments)
        cy.log('Stubbed comments: ' + stubbedcomments)
        cy.get(':nth-child(3) > .card > .card-footer > .date-posted').eq(0)
          .invoke('text')
          .then(mydate => {
            var commentdate =new Date(mydate).toDateString()
            var currentdate = new Date().toDateString()
            cy.log(commentdate)
            cy.log(currentdate)
            expect(commentdate).to.equal(currentdate)
          });
      });
    })

})
