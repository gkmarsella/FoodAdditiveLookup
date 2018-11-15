import React from 'react';
import classes from './ProductList.module.css';

const ProductList = ({products}) => (
    <ul className={classes.ProductList}>
        {products.map(food => <li key={food} className={classes.ProductList}>{food}</li>)}
    </ul>
);

export default ProductList;