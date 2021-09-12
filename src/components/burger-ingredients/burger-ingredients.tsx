import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab';
import {ingredientPropTypes} from '../../utils/types';
import IngredientsGroup from './ingredients-group/ingredients-group';

const BurgerIngredients = ({ingredients} : any) => {
    let buns = ingredients.filter((item: any) => item.type === 'bun');
    let sauces = ingredients.filter((item: any) => item.type === 'sauce');
    let mains = ingredients.filter((item: any) => item.type === 'main');

    const bunsRef = useRef(null);
    const saucesRef = useRef(null);
    const mainsRef = useRef(null);

    const [current, setCurrent] = React.useState('bun');

    const selectGroup = (name: string) => {
        setCurrent(name);

        switch (name) {
            case 'bun':
                // @ts-ignore
                bunsRef.current.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
                break;
            case 'sauce':
                // @ts-ignore
                saucesRef.current.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
                break;
            case 'main':
                // @ts-ignore
                mainsRef.current.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
                break;
        }
    }

    return (
        <div className={`${styles.burger_ingredients} pt-10`}>
            <p className="text text_type_main-large mb-5">
                Соберите бургер
            </p>
            <div className="mb-10" style={{ display: 'flex' }}>
                <Tab value="bun" active={current === 'bun'} onClick={selectGroup}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={selectGroup}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={selectGroup}>
                    Начинки
                </Tab>
            </div>

            <ul className={`${styles.group_list} custom-scroll`}>
                <li ref={bunsRef}>
                    <IngredientsGroup  name="Булки" ingredients={buns}/>
                </li>
                <li ref={saucesRef}>
                    <IngredientsGroup name="Соусы" ingredients={sauces}/>
                </li>
                <li ref={mainsRef}>
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
