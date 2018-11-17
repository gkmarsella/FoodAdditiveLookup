import React, { Component } from 'react';
import axios from 'axios';

class Product extends Component {
    state = {
        ingredients: ['No data found']
    }
    searchIngredients = (ndbno) => {
        const key = process.env.REACT_APP_USDA_CODE;
        axios.get('https://api.nal.usda.gov/ndb/reports',
        {params:{ndbno:ndbno, type:f, api_key:key}})
        .then( response => {
            console.log(response.data)
        })
    }

    render () {
        return (
            <li></li>
        );
    }
}

export default Product;