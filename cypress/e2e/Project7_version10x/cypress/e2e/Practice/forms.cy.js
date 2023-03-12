/// <reference types="cypress-xpath" />

describe('Form filling scenarios', () => {

    it.skip('Filling all the fields and click "Apply Now"', function () {
        cy.get("#user_first_name").type(this.testdata.firstname);
        cy.get("#user_last_name").type(this.testdata.lastname);
        cy.get('#user_email').type(this.testdata.email)
        cy.get("#user_phone").type(this.testdata.phone)
        cy.get('#user_zipcode').type(this.testdata.zipcode)
        cy.get('label[for="user_form_submit"] span[class="MuiButton-label"]').click()

        //After clicking "Apply Now" button, asserting the button name, button name changes to "Already Applied"
        cy.get('#user_form_submit_container > label > .MuiButtonBase-root > .MuiButton-label').should('have.html', 'Already Applied')
    });

    it.skip('Filling first four fields and click "Apply Now"', function () {
        cy.get("#user_first_name").type(this.testdata.firstname);
        cy.get("#user_last_name").type(this.testdata.lastname);
        cy.get('#user_email').type(this.testdata.email)
        cy.get("#user_phone").type(this.testdata.phone)
        cy.get('label[for="user_form_submit"] span[class="MuiButton-label"]').click()

        //After clicking "Apply Now" button, the validation message triggered and so the button name is still "Apply Now"
        cy.get('span.MuiButton-label').eq(1).should('have.text', 'Apply Now')
    });

    it.skip('Filling first three fields and click "Apply Now"', function () {
        cy.get("#user_first_name").type(this.testdata.firstname);
        cy.get("#user_last_name").type(this.testdata.lastname);
        cy.get('#user_email').type(this.testdata.email)
        cy.get('label[for="user_form_submit"] span[class="MuiButton-label"]').click()

        //After clicking "Apply Now" button, the validation message triggered and so the button name is still "Apply Now"
        cy.get('span.MuiButton-label').eq(1).should('have.text', 'Apply Now')
    });

    it.skip('Filling first two fields and click "Apply Now"', function () {
        cy.get("#user_first_name").type(this.testdata.firstname);
        cy.get("#user_last_name").type(this.testdata.lastname);
        cy.get('label[for="user_form_submit"] span[class="MuiButton-label"]').click()

        //After clicking "Apply Now" button, the validation message triggered and so the button name is still "Apply Now"
        cy.get('span.MuiButton-label').eq(1).should('have.text', 'Apply Now')
    });

    it.skip('Filling first field and click "Apply Now"', function () {
        cy.get("#user_first_name").type(this.testdata.firstname);
        cy.get('label[for="user_form_submit"] span[class="MuiButton-label"]').click()

        //After clicking "Apply Now" button, the validation message triggered and so the button name is still "Apply Now"
        cy.get('span.MuiButton-label').eq(1).should('have.text', 'Apply Now')
    });

   /* it('speciality field scenarios', () => {

        cy.get('.job-desc-container').then((ele) => {

            //stored the full description value
            let speciality = ele.html()
            cy.log(speciality);

            //to remove the first 38 letters. this will return the remaining full description
            var res = speciality.slice(38);

            //split the var " " and return the first one
            var finalres = res.split(" ", 1)

            //in order to replace the comma "," at the end, need to change the type to string. use replace() to remove ","
            var finalres2 = finalres.toString()
            specialityvalue = finalres2.replace(",", "")
            print(res);
            print(finalres)
            cy.log(specialityvalue)
        })
        cy.get('body > div:nth-child(5) > div:nth-child(6) > div:nth-child(4) > div:nth-child(1) > form:nth-child(1) > div:nth-child(7) > div:nth-child(9) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > input:nth-child(1)').should('not.be.null')
        cy.get('body > div:nth-child(5) > div:nth-child(6) > div:nth-child(4) > div:nth-child(1) > form:nth-child(1) > div:nth-child(7) > div:nth-child(9) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > input:nth-child(1)').then((ele) => {

            let specialitycontainervalue = ele.val()
            expect(specialityvalue).to.eql(specialitycontainervalue)
            cy.log('speciality value mathches with the speciality container value')
            print('speciality value mathches with the speciality container value')
        })

    });

    });

    */
    it.skip('occupation field scenarios', () => {
        //cy.get('#user_specialties_container-option-751').click();
        cy.get('div.job-desc > p:first-child > strong').then((el) => {
            let occupationvalue = el.html()
            cy.log(occupationvalue)
            //cy.xpath('//input[@id="user_specialties_container"]')
            cy.get('body > div:nth-child(5) > div:nth-child(6) > div:nth-child(4) > div:nth-child(1) > form:nth-child(1) > div:nth-child(7) > div:nth-child(7) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > input:nth-child(1)').should('not.be.null')
            cy.get('body > div:nth-child(5) > div:nth-child(6) > div:nth-child(4) > div:nth-child(1) > form:nth-child(1) > div:nth-child(7) > div:nth-child(7) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > input:nth-child(1)').then((el) => {
                
                let occupationcontainervalue = el.val()
                cy.log(occupationcontainervalue)
                expect(occupationcontainervalue).to.match(/^Physician/)
                cy.log('occupationcontainer value contains text that matches occupationvalue')
            })
        })

    })

    it.skip('terms and conditions-scenarios', () => {

        //assert to the checkbox is already checked and assert for the property
        cy.get('#user_email_optin').scrollIntoView().should('be.checked').should('have.attr', 'checked', 'checked')

        //assert the terms-click the link
        cy.get('#user_email_optin_label > a:first-child').should('have.attr', 'target')
        cy.get('#user_email_optin_label > a:first-child').invoke('removeAttr', 'target').click()
        cy.url().should('include', '/policy?tab=toslink')

        //assert policy-click the link
        cy.go('back')
        cy.get('#user_email_optin_label > a').eq(1).scrollIntoView().should('have.attr', 'target')
        cy.get('#user_email_optin_label > a').eq(1).invoke('removeAttr', 'target').click()
        cy.url().should('include', '/policy?tab=policylink')

    });

    it.skip('speciality field scenarios2', () => {
        cy.get('#job_specialty').invoke('attr', 'value').then((ele) => {
            const newspeciality = ele
            cy.log(newspeciality)
            cy.get('div[id="user_specialties_container"] div[class="MuiInputBase-root MuiInput-root MuiInput-underline MuiAutocomplete-inputRoot MuiInputBase-fullWidth MuiInput-fullWidth MuiInputBase-formControl MuiInput-formControl MuiInputBase-adornedEnd"] input').then((ele) => {

                let specialitycontainervalue2 = ele.val()
    
                expect(newspeciality).to.eql(specialitycontainervalue2)
                cy.log('speciality value mathches with the speciality container value')
                print('speciality value mathches with the speciality container value')
            })
        })
    });

    it('Test1', () => {
        cy.visit('https://app.endtest.io/mailbox')
        cy.get('a[title="Endtest Mailbox"]').should('have.attr', 'target')
        cy.get('a[title="Endtest Mailbox"]').invoke('removeAttr', 'target').click({timeout:5000})
        cy.url().should('include', '/how-to-test-emails/')
    });

    it('Handle New tab', () => {
        cy.visit('https://automationpanda.com/bdd/')
        cy.xpath('//a[normalize-space()="Behavior-Driven Development"]').should('have.attr', 'target')
        cy.xpath('//a[normalize-space()="Behavior-Driven Development"]').invoke('removeAttr', 'target').click({timeout:5000})
        cy.url().should('include', '/wiki/Behavior-driven_development')
    });
});