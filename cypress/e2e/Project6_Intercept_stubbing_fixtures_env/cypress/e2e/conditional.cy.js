//array of different viewports
const sizes = ['macbook-16', 'iphone-6', 'samsung-s10']

describe('test to overriding the default viewport values- applying the array of viewports-to all test blocks', () => {
    // iterating the array of different viewports
    sizes.forEach((array) => {
        it(`Should launch on ${array} screen`, () => {
            cy.viewport(array)

            cy.visit('http://automationpractice.com/index.php')

            cy.get('a[title="Women"]').then(($btn) => {
                //here we  using the jquery selector ':visible'
                if ($btn.is(':visible')) {
                    // do something if it's visible
                    console.log("The tab 'Women' is visible in this viewport")
                    console.log('Mobile viewport for: ' + array);

                } else {
                    // do something else
                    console.log("The tab 'Women' is not visible in this viewport.Click 'Categories' to view 'Women' tab")
                    console.log('Mobile viewport for: ' + array);
                    cy.get('.cat-title').should('be.visible')
                    cy.get('.cat-title').click()
                    cy.get('a[title="Women"]').should('be.visible')

                }
            })

        })
    })

    // it('setting the view port in test block level', () => {
    //    cy.viewport(1024, 768)
    //     cy.wait(5000)
    //    cy.visit('https://testproject.io/')
    //    cy.get('[data-toggle="dropdown"]').should('be.visible')
    //   console.log('Menu Item "Platform" is not visible')
    //   console.log('Mobile viewport for custom width-height');
    //   });

})