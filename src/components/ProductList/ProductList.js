import React, { Component } from 'react';
import classes from './ProductList.module.css';
import axios from 'axios';
import additives from '../../Additives.js'

class Product extends Component {
    state = {
        ingredients: ['No data found']
    }

    searchIngredients = (ndbno) => {
        const key = process.env.REACT_APP_USDA_CODE;
        let ingredients = null;
        let foundAdditives = [];
        axios.get('https://api.nal.usda.gov/ndb/reports',
        {params:{ndbno:ndbno, type:'f', api_key:key}})
        .then( response => {
            // console.log( (response.data['report']['food']['ing']['desc']).toLowerCase() )
            ingredients = (response.data['report']['food']['ing']['desc']).toLowerCase();
        })
        .catch(error => {
            alert('error caught after searching for ingredients', error)
        })
        .then( _ => {
            ingredients.split(', ').map(ing => {
                ing in additives ? foundAdditives.push(ing) : console.log('not found')
            })
        })
        .catch(error => {
            alert('error caught after looking through ingredients for additives', error)
        })
        .then( _ => {
            console.log(foundAdditives)
        })
    }

    render () {
        const Products = (this.props.products)
        .map( food => {
            return (
                <li 
                onClick={() => this.searchIngredients(food.ndbno)}
                key={food.ndbno} 
                className={classes.ProductListLi}>{food.name}</li>
            )
        } );

        return (
            <div>
                <ul className={classes.ProductListUl}>
                    {Products}
                </ul>
            </div>
        );
    }
}

export default Product;