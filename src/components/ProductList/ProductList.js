import React, { Component } from 'react';
import classes from './ProductList.module.css';
import axios from 'axios';
import additives from '../../Additives.js';
import AdditiveList from '../AdditiveList/AdditveList';

class Product extends Component {
    state = {
        products: [],
        ingredients: ['No data found'],
        additivesInProduct: []
    }

    searchIngredients = (ndbno) => {
        const key = process.env.REACT_APP_USDA_CODE;
        let ingredients = null;
        let foundAdditives = [];
        axios.get('https://api.nal.usda.gov/ndb/reports',
        {params:{ndbno:ndbno, type:'f', api_key:key}})
        .then( response => {
            ingredients = (response.data['report']['food']['ing']['desc']).toLowerCase();
        })
        .catch(error => {
            alert('error caught after searching for ingredients', error)
        })
        .then( _ => {
            ingredients.split(', ').forEach(ing => {
                ing in additives ? foundAdditives.push(ing) : console.log('not found')
            })
        })
        .catch(error => {
            alert('error caught after looking through ingredients for additives', error)
        })
        .then( _ => {
            this.setState({
                additivesInProduct: foundAdditives
            })
        })
        .catch(error => {
            alert('Error caught setting state for found additives');
        })
    }

    render () {
        const Products = (this.props.products)
        .map( food => {
            return (
                <div>   
                    <li onClick={() => this.searchIngredients(food.ndbno)} key={food.ndbno}>
                        <span>{food.name}</span>
                    </li>
                </div>
            );
        } );

        return (
            <div>
                <AdditiveList show={this.state.viewing} additives={this.state.additivesInProduct}/>
                <div className={classes.ProductList}>
                    <ul>
                        {Products}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Product;