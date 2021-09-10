import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab';
import {ingredientPropTypes} from '../../utils/data';
import IngredientsGroup from './ingredients-group/ingredients-group';

const BurgerIngredients = ({ingredients} : any) => {
    let buns = ingredients.filter((item: any) => item.type === 'bun');
    let sauces = ingredients.filter((item: any) => item.type === 'sauce');
    let mains = ingredients.filter((item: any) => item.type === 'main');

    const [current, setCurrent] = React.useState('bun');

    return (
        <div className={styles.burger_ingredients + " pt-10"}>
            <p className="text text_type_main-large mb-5">
                Соберите бургер
            </p>
            <div className="mb-10" style={{ display: 'flex' }}>
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>

            <ul className={styles.group_list}>
                <li>
                    <IngredientsGroup name="Булки" ingredients={buns}/>
                </li>
                <li>
                    <IngredientsGroup name="Соусы" ingredients={sauces}/>
                </li>
                <li>
                    <IngredientsGroup name="Начинка" ingredients={mains}/>
                </li>
            </ul>
        </div>
    );
};

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired
};

export default BurgerIngredients;
