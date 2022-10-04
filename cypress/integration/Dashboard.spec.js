describe("Dashboard", () => {
  it("should render login page correctly", () => {
    cy.visit("/");
    cy.get("#textField-User\\ Name").should("exist");
    cy.get("#textField-User\\ Name").clear();
    cy.get("#textField-User\\ Name").type("chevy");
    cy.get(".storybook-button").click();
    cy.get(".pvtRenderers > .pvtDropdown > .pvtDropdownValue").click();
    cy.get(".pvtDropdownActiveValue").click();
    cy.get(".MuiPaper-root > .MuiGrid-root").click();
    cy.get("p").click();
  });
});
