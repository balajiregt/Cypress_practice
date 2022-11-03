describe('intercepting-stubbing-validating dynamic elements', () => {
  var count_when_favorited = 1000
  var count_when_unfavorited=999
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
      expect(interception2.response.body.article.favoritesCount).to.equal(count_when_favorited)
      cy.addContext('Response favorite count:' +interception2.response.body.article.favoritesCount)
      cy.addContext('Expected favorite count:' +count_when_favorited)
      //favoritted flag=true, then the button name will be displayed as "Unfavorite Article"
      expect(interception2.response.body.article.favorited).to.equal(true)
      cy.contains('Unfavorite Article').should('be.visible')
    });
    
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
      expect(interception2.response.body.article.favoritesCount).to.equal(count_when_unfavorited)
      cy.addContext('Response favoritescount:' +interception2.response.body.article.favoritesCount)
      cy.addContext('Expected favorite count: ' + count_when_unfavorited)
    });

    cy.contains('Favorite Article').should('be.visible')

  })

  it('test6-intercept-stubbing: comments', () => {
      //Matching url
      cy.intercept('GET', '**/comments', { fixture: 'comments.json' }).as('comments')
      cy.visit('https://demo.realworld.io/#/', { timeout: 5000 })
      cy.get('article-preview[article="article"]').eq(0).click()
      cy.wait('@comments').then((interception2) => {
        cy.log(JSON.stringify(interception2))
        cy.log(interception2.response.body)
        expect(interception2.response.statusCode).to.equal(200)
        expect(interception2.response.body.comments).to.have.lengthOf(stubbedcomments)
        cy.addContext('Total comments stubbed: ' +stubbedcomments)
        cy.log('Stubbed comments: ' + stubbedcomments)
        cy.get(':nth-child(3) > .card > .card-footer > .date-posted').eq(0)
          .invoke('text')
          .then(mydate => {
            var commentdate =new Date(mydate).toDateString()
            var currentdate = new Date().toDateString()
            expect(commentdate).to.equal(currentdate)
            cy.addContext('stubbedcomment date: ' +commentdate)
            cy.addContext('current date from method Date(): ' +currentdate)
          });
      });
    })

})
