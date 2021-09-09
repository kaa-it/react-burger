import React from 'react';
import styles from './ingredient-item.module.css';
import {ingredientPropTypes} from "../../../utils/data";
import {Counter} from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon';

// @ts-ignore
const IngredientItem = ({item}) => {
    return (
        <div className={styles.ingredient_item}>
            <div className={styles.content}>
                <p className={styles.ingredient_item_text}>
                    {item.name}
                </p>
                <p className={styles.price}>
                    {item.price}
                    <CurrencyIcon type="primary"/>
                </p>
                <img alt="Нет фото" src={item.image} className={styles.illustration}/>
           </div>
            <Counter size="default" count={1}/>
        </div>
    );
};

IngredientItem.propTypes = {
    item: ingredientPropTypes.isRequired
};

export default IngredientItem;
