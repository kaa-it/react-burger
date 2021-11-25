describe("constructor", () => {
  before(() => {
    cy.visit("http://localhost:3000");
  });

  it("can view and close ingredient details", () => {
    cy.get("[data-test^='Краторная булка']").click();
    cy.contains("Детали ингредиента");
    cy.contains("Краторная булка");
    cy.get("[data-test='header'] > svg").click();
    cy.contains("Соберите бургер");
  });
});
