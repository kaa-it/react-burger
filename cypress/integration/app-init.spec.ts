describe("App initialization", () => {
  it("Loads ingredients on home page load", () => {
    cy.seedAndVisit();

    cy.get("[data-test='Булки'] > div").should("have.length", 2);
    cy.get("[data-test='Соусы'] > div").should("have.length", 4);
    cy.get("[data-test='Начинка'] > div").should("have.length", 9);
  });
});
