describe('test3', () => {
  it('validating clipboard', () => {
    cy.visit('https://www.w3schools.com/howto/howto_js_copy_clipboard.asp')
    cy.get('.tooltip.w3-mobile').click()
    cy.on('window:confirm', () => true);
    cy.window().its('navigator.clipboard')
      .invoke('readText')
      .should('equal', 'Hello World')
  });

  it('validating shadow dom elements', () => {
    cy.visit('https://books-pwakit.appspot.com/')
    cy.get('book-app').shadow().find('input#input').should('be.visible')
  });

  it('conditionally searching', () => {
    cy.visit('https://www.wikipedia.org/')
    cy.get('body').then(($body) => {
      // synchronously ask for the body's text
      // and do something based on whether it includes
      // another string
      if ($body.has('option[value="en"]')) {
        // yup found it
        cy.get('option[value="en"]').should('have.attr', 'selected')
        cy.get('#searchInput').type("A.P.J Abdul kalam")
        cy.get('[data-jsl10n="search-input-button"]').click()
      } else {
        // nope not here
        cy.get('#searchLanguage').click()
        cy.get('option[value="en"]').click()
        cy.type("A.P.J Abdul kalam")
        cy.get('[data-jsl10n="search-input-button"]').click()
      }
    })
  })


  it('Conditionally clicking- when the element is visible on certain conditions', () => {
    cy.visit('https://example.cypress.io/todo#/')
    cy.contains('Clear completed').should('not.exist');
    cy.get('a[class="selected"]').should('contain', 'All')
    cy.get('a[href*="active"]').should('have.html', 'Active')
    cy.get('a[href*="completed"]').should('have.html', 'Completed')
    cy.get('li:first-child input.toggle').check()
    cy.wait(10000)
    cy.get('[class="todo-list"]').then(($el) => {
      if ($el.has('[class="completed"]')) {
        cy.contains('Clear completed')

      }

    })

  })

});

