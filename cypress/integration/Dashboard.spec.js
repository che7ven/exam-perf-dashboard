describe("Dashboard", () => {
  it("should render login page correctly", () => {
    cy.visit("/");
    cy.get("#textField-User\\ ID").should("exist");
    cy.get("#textField-User\\ ID").clear();
    cy.get("#textField-User\\ ID").type("chevy");
    cy.get(".storybook-button").click();
    cy.get(":nth-child(2) > .MuiTab-wrapper").click();
    cy.get(":nth-child(3) > .MuiTab-wrapper").click();
    cy.get("p").click();
    cy.get(":nth-child(2) > .MuiTab-wrapper").click();
    cy.get(":nth-child(1) > .MuiTab-wrapper").click();
  });
});
