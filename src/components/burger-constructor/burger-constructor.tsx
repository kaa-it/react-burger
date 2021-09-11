import React from 'react';
import styles from './burger-constructor.module.css';
import {ingredientPropTypes} from "../../utils/data";
import PropTypes from "prop-types";
import {Button, ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/drag-icon';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";

const ConstructorItem = ({item, type}: any) => {
    const isLocked = type !== undefined;
    let suffix = "";

    if (type === "top") {
        suffix = " (верх)";
    } else if (type === "bottom") {
        suffix = " (низ)";
    }

    return (
        <div className={styles.constructor_item}>
            <div style={{visibility: isLocked ? 'hidden' : 'visible'}}>
                <DragIcon type="primary"/>
            </div>
            <ConstructorElement
                type={type}
                isLocked={isLocked}
                text={item.name + suffix}
                price={item.price}
                thumbnail={item.image}
            />
        </div>
    );
}

const BurgerConstructor = ({ingredients} : any) => {
    const count = ingredients.length;
    const total = ingredients.reduce((acc: number, item: any) => item.price + acc, 0);

    console.log("ingredients: " + ingredients[0].price);
    console.log("total: " + total);

    return (
        <div className={`${styles.burger_constructor} pt-25 pl-4 pr-4`}>
            <div className={styles.constructor_area}>
                <div className="pr-4">
                    <ConstructorItem type="top" item={ingredients[0]}/>
                </div>
                <div className={`${styles.scroll_area} custom-scroll`}>
                    {ingredients.slice(1, -1).map((item: any) => (
                        <ConstructorItem item={item} />
                    ))}
                </div>
                <div className="pr-4">
                    <ConstructorItem type="bottom" item={ingredients[count-1]}/>
                </div>
            </div>
            <div className={styles.info}>
                <p className={styles.price}>
                    {total}
                    <CurrencyIcon type="primary"/>
                </p>
                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
};

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired
}

export default BurgerConstructor;
