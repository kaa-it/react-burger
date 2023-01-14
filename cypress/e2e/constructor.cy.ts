describe("Constructor", () => {
  beforeEach(() => {
    cy.setLocalStorage("accessToken", "Bearer mock");
    cy.seedAndVisit();
  });

  it("Can view and close ingredient details", () => {
    cy.get("[data-test='Краторная булка N-300i']").click();
    cy.get("[data-test='header_title']").should(
      "have.text",
      "Детали ингредиента"
    );
    cy.get("[data-test='ingredient_name']").should(
      "have.text",
      "Краторная булка N-300i"
    );
    cy.get("[data-test='header'] > svg").click();
    cy.get("[data-test='ingredients_catalog_title']").should(
      "have.text",
      "Соберите бургер"
    );
  });

  it("Can make order", () => {
    cy.get("[data-test='Флюоресцентная булка R2-D3']").trigger("dragstart");
    cy.get("[data-test='constructor_area'").trigger("drop");
    cy.get(
      "[data-test='Флюоресцентная булка R2-D3'] [class^='counter__num']"
    ).should("have.text", "2");
    cy.get("[data-test='top_bun'] .constructor-element__text").should(
      "have.text",
      "Флюоресцентная булка R2-D3 (верх)"
    );
    cy.get("[data-test='bottom_bun'] .constructor-element__text").should(
      "have.text",
      "Флюоресцентная булка R2-D3 (низ)"
    );
    cy.get("[data-test='Соус фирменный Space Sauce']").trigger("dragstart");
    cy.get("[data-test='constructor_area'").trigger("drop");
    cy.get(
      "[data-test='Соус фирменный Space Sauce'] [class^='counter__num']"
    ).should("have.text", "1");
    cy.get("[data-test='constructor_ingredients'] > div").should(
      "have.length",
      1
    );
    cy.get(
      "[data-test='constructor_ingredients'] > div .constructor-element__text"
    ).should("have.text", "Соус фирменный Space Sauce");
    cy.intercept("POST", "https://norma.nomoreparties.space/api/orders", {
      fixture: "order",
    });
    cy.get("[data-test='create_order']").click();
    cy.get("[data-test='order_number']").should("have.text", "6190");
    cy.get("[data-test='order_name']").should(
      "have.text",
      "Флюоресцентный space бургер"
    );
    cy.get("[data-test='header'] > svg").click();
    cy.get("[data-test='ingredients_catalog_title']").should(
      "have.text",
      "Соберите бургер"
    );
  });
});
