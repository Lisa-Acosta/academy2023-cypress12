Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
});

describe("Login Crowdar Cypress Demo", () => {
    it("Login", () => {

        cy.visit("https://practice.automationtesting.in/my-account/");
        
        var username = "lisa.acosta@gmail.com";
       var pass = "Ninguna01$?";

        cy.get('#username').type(username);
        cy.get('#password').type(pass+"{enter}");
                
        cy.get('strong').should('contain.text', 'lisa.acosta');
        

    });
});