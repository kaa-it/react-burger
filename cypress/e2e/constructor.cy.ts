describe("drags ingredients to constructor works correctly", () => {
  beforeEach(() => {
    cy.setLocalStorage("accessToken", "Bearer mock");
    cy.seedAndVisit();
  });

  it("should drag bun", () => {
    cy.get("[data-test=ingredients]").contains("Булка 1").trigger("dragstart");
    cy.get("[data-test=constructor_area").trigger("drop");
    cy.get("[data-test=top_bun]").contains("Булка 1 (верх)").should("exist");
    cy.get("[data-test=bottom_bun]").contains("Булка 1 (низ)").should("exist");
  });

  it("should drag ingredient", () => {
    cy.get("[data-test=ingredients]")
      .contains("Ингредиент 1")
      .trigger("dragstart");
    cy.get("[data-test=constructor_area").trigger("drop");
    cy.get("[data-test=ingredients]")
      .contains("Ингредиент 2")
      .trigger("dragstart");
    cy.get("[data-test=constructor_area]").trigger("drop");
    cy.get("[data-test=constructor_area]")
      .contains("Ингредиент 1")
      .should("exist");
    cy.get("[data-test=constructor_area]")
      .contains("Ингредиент 2")
      .should("exist");
  });
});

describe("ingredient modal works correctly", () => {
  beforeEach(() => {
    cy.setLocalStorage("accessToken", "Bearer mock");
    cy.seedAndVisit();
  });

  it("should work open modal", () => {
    cy.contains("Детали ингредиента").should("not.exist");
    cy.contains("Ингредиент 1").click();
    cy.contains("Детали ингредиента").should("exist");
    cy.get("#react-modals").contains("Ингредиент 1").should("exist");
  });

  it("should work close modal on button click", () => {
    cy.contains("Ингредиент 1").click();
    cy.contains("Детали ингредиента").should("exist");
    cy.get("#react-modals div[data-test=close_button]").click();
    cy.contains("Детали ингредиента").should("not.exist");
  });

  it("should work close modal on overlay click", () => {
    cy.contains("Ингредиент 1").click();
    cy.contains("Детали ингредиента").should("exist");
    cy.get("[data-test=modal_overlay]").click("left", { force: true });
    cy.contains("Детали ингредиента").should("not.exist");
  });
});

describe("order modal works correctly", () => {
  beforeEach(() => {
    cy.intercept("POST", "https://norma.nomoreparties.space/api/orders", {
      fixture: "order",
    }).as("postOrder");
    cy.setLocalStorage("accessToken", "Bearer mock");
    cy.seedAndVisit();
  });

  afterEach(() => {
    cy.removeLocalStorage("accessToken");
  });

  it("should order burger work", () => {
    cy.get("[data-test=ingredients]").contains("Булка 1").trigger("dragstart");
    cy.get("[data-test=constructor_area").trigger("drop");
    cy.get("[data-test=ingredients]")
      .contains("Ингредиент 1")
      .trigger("dragstart");
    cy.get("[data-test=constructor_area").trigger("drop");
    cy.get("[data-test=ingredients]")
      .contains("Ингредиент 2")
      .trigger("dragstart");
    cy.get("[data-test=constructor_area]").trigger("drop");
    cy.get("[data-test='create_order']").click();

    cy.wait("@postOrder")
      .its("request.body")
      .should("deep.equal", {
        ingredients: [
          "60d3b41abdacab0026a733c7",
          "60d3b41abdacab0026a733c8",
          "60d3b41abdacab0026a733c9",
          "60d3b41abdacab0026a733c7",
        ],
      });

    cy.get("[data-test=order_number]").should("have.text", "6190");

    cy.get("#react-modals div[data-test=close_button]").click();
    cy.contains("[data-test=order_number]").should("not.exist");
  });
});
