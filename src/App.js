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
      searchValue: '',
      test: null
    };
  }
  
  onChange = (event) => {
    this.setState({searchValue: event.target.value})
    console.log('changed')
  }

  //Searching for a food by a keyword. Creates a list (shown at ProductList)
  onSubmit = (event) => {
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
        console.log('[response]', response.data)
        results = (response.data['list']['item']);
      })
      .catch(error => {
        console.log('[after first then]: '  + error);
        alert('no results');
      })
      .then(function () {
        console.log('[results]', results);
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
        console.log('[after second then]: ' + error)
        alert('No results')
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
          <input type='text' value={this.state.searchValue} onChange={this.onChange}/>
          <button>Search</button>
        </form>
        <ProductList products={this.state.products}/>
        {this.state.test}
      </div>
    );
  }
}

export default App;
