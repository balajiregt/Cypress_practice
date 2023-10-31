describe('Visual testing login page', () => {
    it('visual testing - capturing base visual', () => {
       cy.visit('/index_v2.html');
      //cy.visit('https://practicetestautomation.com/practice-test-login/')
      //cy.visit('/');
      cy.compareSnapshot('login', {
        capture: 'fullPage',
        errorThreshold: 0.00,
      })// Adjust the threshold as needed
    });
  });
  