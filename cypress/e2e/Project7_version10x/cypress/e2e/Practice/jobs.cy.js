describe('validating "/physicians-hospitals/telephealth-openings" page', () => {
    beforeEach(() => {
        cy.visit('https://staging.directshifts.com/jobs/p/physicians-hospital-telehealth-openings-9057')
    });

let jobtitle='Physicians - Hospital/Telehealth Openings'
let location='Multistate, ANY'


it('to assert landing page', () => {

    //assertig the class "job-title" and its description
    cy.get('.job-title').should("have.html", jobtitle)

    //asserting the job opening locaiton
    cy.contains(location)
    
    
});

});
