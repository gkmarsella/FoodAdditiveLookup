import React from 'react';
import classes from './Navbar.module.css';

const Navbar = props => {
    return (
        <nav className={classes.Navbar}>
            <div className={classes.Logo}>Logo</div>
            <div>About</div>
            <div>View Additives</div>
            <div>Sign In</div>
        </nav>
    );
}

export default Navbar;