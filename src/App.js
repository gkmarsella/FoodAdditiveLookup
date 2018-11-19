import React, { Component } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList/ProductList';
// import AdditiveList from './components/AdditiveList/AdditveList';
import classes from './App.module.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      products: [],
      searchValue: ''
    };
  }

  //Searching for a food by a keyword. Creates a list (shown at ProductList)
  onSubmit = (event) => {
    this.setState({searchValue: event.target.value})
    event.preventDefault()
    const food = this.state.searchValue;
    const key = process.env.REACT_APP_USDA_CODE;
    let results = null;
    let justNames = [];
    // Matches everything before UPC so the name looks clean when save
    let upcRegex = /^.*(?=(\, UPC:))/;
    let gtinRegex = /^.*(?=(\, GTIN:))/;
    axios.get('https://api.nal.usda.gov/ndb/search/?format=json&max=15&sort=n&offset=0',
     {params:{q:food, api_key:key}})
      .then(response => {
        results = (response.data['list']['item']);
      })
      .catch(error => {
        alert('no results', error);
      })
      .then(function () {
        for(let i=0; i < results.length; i++){
          if ( results[i]['ds'] === 'LI' ){
            justNames.push({name:results[i]['name'].match(upcRegex)[0], ndbno:results[i]['ndbno']})
          } else 
          if ( results[i]['ds'] === 'GDSN' ){
            justNames.push({name:results[i]['name'].match(gtinRegex)[0], ndbno:results[i]['ndbno']})
          } else {
            justNames.push({name:results[i]['name'], ndbno:results[i]['ndbno']})
          }
        }
      })
      .catch(error => {
        alert('No results', error)
      })
      .then(() => {
        this.setState({
          products: justNames,
          searchValue: ''
        });
      })
  }

  render() {
    return (
      <div className="App">  
        <form onSubmit={this.onSubmit} className={classes.SearchBar}>
          <input type='text' defaultValue={this.state.searchValue}/>
          <button>Search</button>
        </form>
        <ProductList products={this.state.products}/>
      </div>
    );
  }
}

export default App;
