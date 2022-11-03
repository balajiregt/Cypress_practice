describe('noggin navigation', () => {
    // it('resources flow', () => {
    //     cy.viewport(1250,800)
    //     cy.visit("https://www.noggin.io/")
    //     cy.get('div[data-menu-id="50494947590"] ul li:nth-of-type(3)').trigger('mouseover')
    //     cy.contains('Resource Center').click()
    //     cy.get('div.ui-group:first-child select').scrollIntoView().select(2)
    //     cy.xpath('//span[contains(text(),"Guide to Operating a Security Operations Center (S")]').click()
    // });

    it('test-trigger-mouseover', () => {
        cy.viewport(1250,800)
        cy.visit("https://www.vinsguru.com/selenium-webdriver-automating-hoverable-multilevel-dropdowns/")
        cy.get('.menu-item-3594').trigger('mouseover')
        cy.contains('Kafka').click()
        cy.get('.cat-item.cat-item-50.current-cat').click()
    });

    it('controlling new tabs-by removeing target= _blank', () => {
        cy.visit('https://www.w3schools.com/')
        cy.get('a[title="Tutorials"]').click()
        cy.contains("Learn JavaScript").click()
        //  cy.get('div.w3-example a[target="_blank"]')
        cy.get('div[class="exercisewindow"] a[target="_blank"]').should('have.attr','target')
        cy.get('div[class="exercisewindow"] a[target="_blank"]').invoke('removeAttr','target')
        //cy.url().should('include','/tryit.asp?filename=tryjs')
    });

    it('test-scrollintoview', () => {
        cy.visit('https://javascript.info/mousemove-mouseover-mouseout-mouseenter-mouseleave')
        cy.get('div[class="code-tabs code-tabs_result_on"]:nth-of-type(3)').scrollIntoView()
        cy.get('#parent').scrollIntoView()
    });

});