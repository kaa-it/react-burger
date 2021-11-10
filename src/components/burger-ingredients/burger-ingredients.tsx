import React, { useCallback, useRef } from "react";
import styles from "./burger-ingredients.module.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab";
import IngredientsGroup from "./ingredients-group/ingredients-group";
import { switchTab } from "../../services/ingredientsSlice";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services";
import { IModalLocationState, TIngredient } from "../../utils/types";

const BurgerIngredients: React.FC = () => {
  const bunsRef = useRef<HTMLLIElement>(null);
  const saucesRef = useRef<HTMLLIElement>(null);
  const mainsRef = useRef<HTMLLIElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const history = useHistory<IModalLocationState>();

  const { ingredients, currentTab } = useAppSelector(
    (state) => state.ingredients
  );

  const selectGroup = (name: string) => {
    dispatch(switchTab(name));

    switch (name) {
      case "bun":
        bunsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
        break;
      case "sauce":
        saucesRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
        break;
      case "main":
        mainsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
        break;
    }
  };

  const handleScrollGroups = () => {
    const tabsBottom = tabsRef.current?.getBoundingClientRect().bottom;
    const bunsTop = bunsRef.current?.getBoundingClientRect().top;
    const saucesTop = saucesRef.current?.getBoundingClientRect().top;
    const mainsTop = mainsRef.current?.getBoundingClientRect().top;

    if (!tabsBottom || !bunsTop || !saucesTop || !mainsTop) {
      return;
    }

    const bunsDelta = Math.abs(bunsTop - tabsBottom);
    const saucesDelta = Math.abs(saucesTop - tabsBottom);
    const mainsDelta = Math.abs(mainsTop - tabsBottom);

    const min = Math.min(bunsDelta, saucesDelta, mainsDelta);

    const newTab =
      min === bunsDelta ? "bun" : min === saucesDelta ? "sauce" : "main";

    if (newTab !== currentTab) {
      dispatch(switchTab(newTab));
    }
  };

  const showIngredientDetails = useCallback((item: TIngredient) => {
    history.push({
      pathname: `/ingredients/${item._id}`,
      state: { modal: true },
    });
  }, []);

  return (
    <div className={`${styles.burger_ingredients} pt-10`}>
      <p className={styles.title}>Соберите бургер</p>
      <div className={styles.tabs} ref={tabsRef}>
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
      <div className={styles.ingredients}>
        <ul
          className={`${styles.group_list} custom-scroll`}
          onScroll={handleScrollGroups}
        >
          <li ref={bunsRef}>
            <IngredientsGroup
              name="Булки"
              ingredients={ingredients.filter((item) => item.type === "bun")}
              showDetails={showIngredientDetails}
            />
          </li>
          <li ref={saucesRef}>
            <IngredientsGroup
              name="Соусы"
              ingredients={ingredients.filter((item) => item.type === "sauce")}
              showDetails={showIngredientDetails}
            />
          </li>
          <li ref={mainsRef}>
            <IngredientsGroup
              name="Начинка"
              ingredients={ingredients.filter((item) => item.type === "main")}
              showDetails={showIngredientDetails}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BurgerIngredients;
