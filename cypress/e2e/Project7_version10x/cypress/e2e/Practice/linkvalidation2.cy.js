
describe('Link validation scenarios', () => {

    it('iterate-validating table data td- validating the href', () => {
        let states = []
        var statesnumber
        let baseurl = 'https://en.wikipedia.org'
        let temp
        cy.visit('https://en.wikipedia.org/wiki/List_of_Indian_states_and_union_territories_by_GDP')
        cy.get('table:nth-child(18) tbody tr td:first-child a')
            .then((count) => {
                statesnumber = count.length
                cy.log(statesnumber)
                cy.addContext("Total state count " + statesnumber)
                for (let i = 0; i < statesnumber; i++) {
                    cy.get('table:nth-child(18) tbody a').eq(i).then((el) => {
                        temp = el.text()
                        cy.log("State is: " + temp)
                        cy.addContext("The State is: " + temp)
                        states.push(temp)
                    })
                }

                for (let i = 0; i < statesnumber; i++) {
                    cy.get('table:nth-child(18) tbody a').eq(i).then((ele) => {
                        cy.wrap(ele).should('have.attr', 'href')
                            .then((ele) => {
                                let path1 = ele.toString()
                                let newurl = baseurl + path1
                                cy.log("New url path: " + newurl)
                                //replacing the _ in the url to match the href text
                                newurl = newurl.replace(/_/g, ' ')

                                if (newurl.includes(states[i])) {
                                    cy.log('The new url includes the expected path parameter: ' + '/' + states[i])
                                    cy.addContext('The new url includes the expected path parameter: ' + '/' + states[i])
                                }
                                else {
                                    cy.log('The new url is not an expected one')
                                    cy.addContext('The new url is not an expected one')
                                }
                            })
                    })
                }
            })
    })

});