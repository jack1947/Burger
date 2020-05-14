import React from 'react';

import BurgerLogo from '../../Assets/Images/burger-logo.png'
import classes from './Logo.module.css'

const Logo = (props) => (
    <div className={classes.Logo}>
        <img src={BurgerLogo} alt='MyBurger'/>
    </div>
);

export default Logo;