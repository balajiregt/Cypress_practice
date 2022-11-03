describe('blog', () => {

    // it('dom table cell data validation', () => {
    //     cy.visit('http://the-internet.herokuapp.com')
    //     cy.get('a[href="/large"]').click()

    //     //tr class which starts with 'row'. This will cover all the rows of 'column-1'
    //     cy.get('tr[class^="row"] td[class="column-1"]')
    //         .each((cell) => {
    //             let cellvalue = ''
    //             cellvalue += cell.text()
    //             expect(cellvalue).contains('.1')
    //             cy.log(cellvalue)
    //             cy.addContext(cellvalue)
    //         })   
    // });

    // it('sample-validating table data td- clicking the links- validating the href', () => {
    //     let countries = ['Russia']
    //     let baseurl = 'https://en.wikipedia.org'
    //     cy.visit('https://en.wikipedia.org/wiki/List_of_countries_and_dependencies_by_area')
    //     cy.get('tbody tr:nth-of-type(2) td:nth-of-type(2) a').should('have.attr', 'href')
    //         .then((el) => {
    //             const path1 = el.toString()
    //             cy.log(path1)
    //             cy.visit(baseurl + path1)
    //             //cy.log("uri string is " +baseurlstring + path1)
    //             cy.url().should('include', `/wiki/${countries}`)
    //             cy.log('landed in expected country')
                
    //         })
    // });

    it.only('iterate-validating table data td- clicking the links- validating the new page element', () => {
        let states = []
        var statesnumber
        let baseurl = 'https://en.wikipedia.org'
        let temp
        cy.visit('https://en.wikipedia.org/wiki/List_of_Indian_states_and_union_territories_by_GDP')
        cy.get('table:nth-child(18) tbody tr td:first-child a')
            .then((count) => {
                statesnumber = count.length
                cy.log("Total state count " +statesnumber)
                cy.addContext("Total state count " +statesnumber)
                for (let i = 0; i < statesnumber; i++) {
                    cy.get('table:nth-child(18) tbody a').eq(i).then((el) => {
                        temp = el.text()
                        cy.log("State is: " +temp)
                        cy.addContext("The State is: " +temp)
                        states.push(temp)
                    })
                }

                for (let i = 0; i < statesnumber; i++) {
                    cy.get('table:nth-child(18) tbody a').eq(i).then((ele) => {
                        cy.wrap(ele).should('have.attr', 'href')
                            .then((ele) => {
                                let path1 = ele.toString()
                                let newurl = baseurl + path1
                                cy.log("new url path is " +newurl)

                                // let strRegEx = `[^${states[i]}]`;  //set regex with variables
                                // let newRegEx = new RegExp(strRegEx, 'g'); //create new regex object
                                // //regex object pattern is: RegExp(pattern, modifiers)
                                
                                cy.visit(newurl)
                                cy.url().then(($url) => {
                                    const viewurl = $url.replace(/_/g, ' ')
                                    expect(viewurl).to.includes(viewurl)
                                    cy.log('new url includes the expected path parameter: ' + states[i])
                                    cy.addContext("new url includes the expected path parameter: " +'/'+ states[i])
                                    
                                })
                                cy.get('.mw-page-title-main',{timeout:3000}).then((ele)=>{
                                    let headertext=ele.text()

                                    //text assertion on the landed page
                                    expect(headertext).includes(states[i])
                                    cy.log('page contains information about: ' + states[i])
                                    cy.addContext('page contains information about: ' + states[i])
                                    
                                })
                               
                                cy.go('back').get('table:nth-child(18) tbody a')
                            })
                    })

                }

            })
    })

    // it('next', () => {
    //     cy.visit('http://the-internet.herokuapp.com')
    //     cy.get('li:nth-child(1)').next().then((ele) => {
    //         cy.log(ele.text())
    //     })
    // })

    it('test', () => {

        //iterate 3 column cells. starting from 1
        let columnnumbers=3
        cy.visit('http://the-internet.herokuapp.com/large')

        //looping the td child number. From 1 to 3.
        for(let i=1; i <= columnnumbers; i++){
            cy.get("tbody tr td:nth-child("+i+")").each((ele)=>{
                let cell=ele.text()
                cy.log('cell values of column: ' +i+ ' is ' +cell)

                //some assertions as per business needs
                expect(cell).to.contain('.' +i)
            })
        }
        
    });
})
