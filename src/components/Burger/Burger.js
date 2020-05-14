import React from 'react';

import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const Burger = (props) => {
    let burgerIngredients = Object.keys(props.ingredients)
        .map(igName => [...Array(props.ingredients[igName])]
            .map((_, i) => <BurgerIngredient type={igName} key={igName + i} />)

        )
        .flat(Infinity);

    if(!burgerIngredients.length)
        burgerIngredients = <p>Please add Ingerdients</p>


    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {burgerIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
}

export default Burger;