import React from 'react';
import styles from './burger-constructor.module.css';
import {ingredientPropTypes} from "../../utils/data";
import PropTypes from "prop-types";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerConstructor = ({ingredients} : any) => {
    let count = ingredients.length;

    return (
        <div className={styles.burger_constructor + " pt-25 pl-4 pr-4"}>
            <div className={styles.constructor_area}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={ingredients[0].name + " (верх)"}
                    price={ingredients[0].price}
                    thumbnail={ingredients[0].image}
                />
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={ingredients[count-1].name + " (низ)"}
                    price={ingredients[count-1].price}
                    thumbnail={ingredients[count-1].image}
                />
            </div>
        </div>
    );
};

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired
}

export default BurgerConstructor;
