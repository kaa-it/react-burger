import React, { useCallback, useContext, useRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab";
import { ingredientPropTypes } from "../../utils/types";
import IngredientsGroup from "./ingredients-group/ingredients-group";
import Modal from "../modal/modal";
import IngredientDetails from "./ingredient-details/ingredient-details";
import { v4 as uuid } from "uuid";

import {
  BunContext,
  ConstructorIngredientsContext,
  TotalPriceContext,
} from "../../services/constructorContext";

const BurgerIngredients = ({ ingredients }: any) => {
  let buns = ingredients.filter((item: any) => item.type === "bun");
  let sauces = ingredients.filter((item: any) => item.type === "sauce");
  let mains = ingredients.filter((item: any) => item.type === "main");

  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const mainsRef = useRef(null);

  const [current, setCurrent] = React.useState("bun");
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  // @ts-ignore
  const { bun, setBun } = useContext(BunContext);
  // @ts-ignore
  const { constructorIngredients, setConstructorIngredients } = useContext(
    ConstructorIngredientsContext
  );
  // @ts-ignore
  const { totalPriceDispatcher } = useContext(TotalPriceContext);

  const selectGroup = (name: string) => {
    setCurrent(name);

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

  const showDetails = useCallback(
    (item: any) => {
      setCurrentItem(item);
      setDetailsVisible(true);

      if (item.type === "bun") {
        if (bun !== null) {
          totalPriceDispatcher({ type: "remove", payload: bun.price * 2 });
        }
        setBun(item);
        totalPriceDispatcher({ type: "add", payload: item.price * 2 });
      } else {
        setConstructorIngredients([
          ...constructorIngredients,
          { ...item, key: uuid() },
        ]);
        totalPriceDispatcher({ type: "add", payload: item.price });
      }
    },
    [constructorIngredients, bun]
  );

  const closeDetails = () => {
    setDetailsVisible(false);
  };

  return (
    <div className={`${styles.burger_ingredients} pt-10`}>
      <p className="text text_type_main-large mb-5">Соберите бургер</p>
      <div className="mb-10" style={{ display: "flex" }}>
        <Tab value="bun" active={current === "bun"} onClick={selectGroup}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={selectGroup}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={selectGroup}>
          Начинки
        </Tab>
      </div>

      <ul className={`${styles.group_list} custom-scroll`}>
        <li ref={bunsRef}>
          <IngredientsGroup
            name="Булки"
            ingredients={buns}
            showDetails={showDetails}
          />
        </li>
        <li ref={saucesRef}>
          <IngredientsGroup
            name="Соусы"
            ingredients={sauces}
            showDetails={showDetails}
          />
        </li>
        <li ref={mainsRef}>
          <IngredientsGroup
            name="Начинка"
            ingredients={mains}
            showDetails={showDetails}
          />
        </li>
      </ul>
      {detailsVisible && (
        <Modal onClose={closeDetails} title="Детали ингредиента">
          <IngredientDetails ingredient={currentItem} />
        </Modal>
      )}
    </div>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
};

export default BurgerIngredients;
