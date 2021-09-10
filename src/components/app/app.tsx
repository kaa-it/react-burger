import React from 'react';
import styles from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {ingredients} from "../../utils/data";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
        <main className={styles.main}>
          <BurgerIngredients ingredients={ingredients}/>
          <div className="mr-10"/>
          <BurgerConstructor ingredients={ingredients}/>
        </main>
    </div>
  );
}

export default App;
