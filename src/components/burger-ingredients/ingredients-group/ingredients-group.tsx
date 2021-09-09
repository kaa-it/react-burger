import React from 'react';
import PropTypes from "prop-types";
import styles from './ingredients-group.module.css';
import {ingredientPropTypes} from "../../../utils/data";
import IngredientItem from "../ingredient-item/ingredient-item";

// @ts-ignore
const IngredientsGroup = ({name, ingredients}) => {
    return (
        <>
            <p className="text text_type_main-medium mb-6">
                {name}
            </p>
            <div className={styles.content}>
                {ingredients.map((item: any) => <IngredientItem item={item}/>)}
            </div>
        </>
    );
};

IngredientsGroup.propTypes = {
    name: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired
};

export default IngredientsGroup;
