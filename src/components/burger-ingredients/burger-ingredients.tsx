import React, { useCallback, useRef } from "react";
import styles from "./burger-ingredients.module.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab";
import IngredientsGroup from "./ingredients-group/ingredients-group";
import Modal from "../modal/modal";
import IngredientDetails from "./ingredient-details/ingredient-details";
import { v4 as uuid } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { switchTab } from "../../services/ingredientsSlice";
import { setBun, addIngredient } from "../../services/constructorSlice";
import {
  showDetails,
  closeDetails,
} from "../../services/ingredientDetailsSlice";

const BurgerIngredients = () => {
  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const mainsRef = useRef(null);
  const tabsRef = useRef(null);

  const dispatch = useDispatch();

  // @ts-ignore
  const { ingredients, currentTab } = useSelector((state) => state.ingredients);

  const { bun, ingredients: constructorIngredients } = useSelector(
    // @ts-ignore
    (state) => state.burgerConstructor
  );

  // @ts-ignore
  const { isShown } = useSelector((state) => state.ingredientDetails);

  // @ts-ignore
  const { ingredient } = useSelector((state) => state.ingredientDetails);

  const selectGroup = (name: string) => {
    dispatch(switchTab(name));

    switch (name) {
      case "bun":
        // @ts-ignore
        bunsRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
        break;
      case "sauce":
        // @ts-ignore
        saucesRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
        break;
      case "main":
        // @ts-ignore
        mainsRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
        break;
    }
  };

  const handleScrollGroups = () => {
    // @ts-ignore
    const tabsBottom = tabsRef.current.getBoundingClientRect().bottom;

    // @ts-ignore
    const bunsTop = bunsRef.current.getBoundingClientRect().top;
    // @ts-ignore
    const saucesTop = saucesRef.current.getBoundingClientRect().top;
    // @ts-ignore
    const mainsTop = mainsRef.current.getBoundingClientRect().top;

    const bunsDelta = Math.abs(bunsTop - tabsBottom);
    const saucesDelta = Math.abs(saucesTop - tabsBottom);
    const mainsDelta = Math.abs(mainsTop - tabsBottom);

    const min = Math.min(bunsDelta, saucesDelta, mainsDelta);

    const newTab =
      min === bunsDelta ? "bun" : min === saucesDelta ? "sauce" : "main";

    dispatch(switchTab(newTab));
  };

  const showIngredientDetails = useCallback((item: any) => {
    dispatch(showDetails(item));

    if (item.type === "bun") {
      dispatch(setBun(item));
    } else {
      dispatch(addIngredient({ ...item, key: uuid() }));
    }
  }, []);

  const closeIngredientDetails = () => {
    dispatch(closeDetails());
  };

  return (
    <div className={`${styles.burger_ingredients} pt-10`}>
      <p className="text text_type_main-large mb-5">Соберите бургер</p>
      <div className="mb-10" style={{ display: "flex" }} ref={tabsRef}>
        <Tab value="bun" active={currentTab === "bun"} onClick={selectGroup}>
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={currentTab === "sauce"}
          onClick={selectGroup}
        >
          Соусы
        </Tab>
        <Tab value="main" active={currentTab === "main"} onClick={selectGroup}>
          Начинки
        </Tab>
      </div>

      <ul
        className={`${styles.group_list} custom-scroll`}
        onScroll={handleScrollGroups}
      >
        <li ref={bunsRef}>
          <IngredientsGroup
            name="Булки"
            ingredients={ingredients.filter((item: any) => item.type === "bun")}
            showDetails={showIngredientDetails}
          />
        </li>
        <li ref={saucesRef}>
          <IngredientsGroup
            name="Соусы"
            ingredients={ingredients.filter(
              (item: any) => item.type === "sauce"
            )}
            showDetails={showIngredientDetails}
          />
        </li>
        <li ref={mainsRef}>
          <IngredientsGroup
            name="Начинка"
            ingredients={ingredients.filter(
              (item: any) => item.type === "main"
            )}
            showDetails={showIngredientDetails}
          />
        </li>
      </ul>
      {isShown && (
        <Modal onClose={closeIngredientDetails} title="Детали ингредиента">
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
    </div>
  );
};

export default BurgerIngredients;
