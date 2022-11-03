

describe("sanity capturing the 'Todays Deals' list length", ()=>{
    it('amazon test 1', () => {
        cy.visit('https://www.amazon.in/')
        cy.wait(3000)
        cy.get('div[class="a-section a-spacing-none feed-carousel first-carousel"] ul[role="list"] li[role]')
        .then(($el) => {
         const count= $el.length //using .length to capture the list count
         expect(count).eq(count)
         cy.log('Todays deals list count is ' +count)
         console.log('Todays deals list count is ' +count)
        })

    })

    it('amazon test 2', () => {
        cy.visit('https://www.amazon.in/ref=nav_logo')
        cy.wait(3000)
        cy.get('#desktop-5 li[aria-setsize]')
        .then(($el) => {
         const count= $el.length //using .length to capture the list length/count
         expect(count).eq(count)
         cy.log('Best Sellers in Computers & Accessories ' +count)
         console.log('Best Sellers in Computers & Accessories ' +count)
        })

    })

    it('capturing medibuddy city count', () => {
        cy.visit('https://www.medibuddy.in/')
        cy.wait(3000)
        cy.get('#products > a:nth-of-type(2)').click()  //selecting the 2nd index of tag <a>
        cy.get('span.mm-chevron-down.bold.active-color').click()
        cy.get('div[ng-show="allCities.length > 0"] > div[ng-click]')
        .then(($el) => {
            const count= $el.length  //using .length to capture the elements count
            expect(count).eq(count)
            cy.log('Medibuddys city count ' +count)
            console.log('Medibuddys city count ' +count)
           })
    });
})