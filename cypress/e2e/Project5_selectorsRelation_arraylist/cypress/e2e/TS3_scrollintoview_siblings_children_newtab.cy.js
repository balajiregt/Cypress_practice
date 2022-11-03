const urlstring='https://www.w3schools.com/js/'

describe('sanity', () => {
    beforeEach(() => {
        cy.visit('https://www.w3schools.com/')
    });
    
    it('home screen validation', () => {
        //cy.viewport('macbook-16')
        cy.contains('Learn to Code')
        cy.contains('NEW')
        cy.get('.ribbon-topnav').should('have.html','NEW')
    });

    it('locator using .find', () => {
        cy.get('.w3-col.l6.w3-center').find('[class^="w3-button ws-yellow"]').then(($el) => {
         var buttonnames=$el.text()
         cy.log(buttonnames)
        })
        .click()
    });

    it('locator using .children', () => {
        cy.get('#main').children().should('have.length',18)
    });

    it('locator using .siblings', () => {
        cy.get('#main').siblings().then(($el) => {
            var buttonnames2=$el.length
            cy.log(buttonnames2)
           })
    });

    it('using scrolltoview-controlling new tabs-by removeing target= _blank', () => {
        cy.get('a[title="Tutorials"]').click()
        cy.contains("Learn JavaScript").click()
        cy.get('div.w3-example a[target="_blank"]').scrollIntoView().should('have.attr','target')
        cy.get('div.w3-example a[target="_blank"]').scrollIntoView().invoke('removeAttr','target').click()
        cy.url().should('include','/tryit.asp?filename=tryjs')
    });

    it('controlling newtab using- href', () => {
        cy.get('a[title="Tutorials"]').click()
        cy.contains("Learn JavaScript").click()
        cy.get('div.w3-example a[target="_blank"]').scrollIntoView()
        .should('have.attr', 'href')
        .then((href)=>{
            const path1 = href.toString()
            cy.log(path1)
            cy.visit(urlstring + href)
            cy.url().should('include','/tryit.asp?filename=tryjs')
        })
    });

});