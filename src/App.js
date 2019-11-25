import React, { Component } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList/ProductList';
// import AdditiveList from './components/AdditiveList/AdditveList';
import classes from './App.module.css';
import Navbar from './components/Navigation/Navbar/Navbar';

const usda_key = process.env.REACT_APP_USDA_KEY;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      products: [],
      searchValue: ''
    };
  }
  // refs
  // cb function after set state
// look up super

  onChange = (event) => {
    this.setState({searchValue: event.target.value});
  }

  //Searching for a food by a keyword. Creates a list (shown at ProductList)
  onSubmit = (event) => {
    event.preventDefault()
    const food = this.state.searchValue;
    const key = process.env.REACT_APP_USDA_CODE;
    let results = null;
    let justNames = [];
    // Matches everything before UPC so the name looks clean when save
    let upcRegex = /^.*(?=(, UPC:))/;
    let gtinRegex = /^.*(?=(, GTIN:))/;
    const data = {
      'generalSearchInput':food
    };
    axios.post('https://api.nal.usda.gov/fdc/v1/search/?api_key=' + usda_key, data)
      .then(response => {
        console.log(response);
        results = (response.data['list']['item']);
      })
      .catch(error => {
        console.log('no results', error);
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
        console.log('No results', error)
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
        <Navbar />
        <form onSubmit={this.onSubmit} className={classes.SearchBar}>
          <input type='text' value={this.state.searchValue} onChange={this.onChange}/>
          <button>Search</button>
        </form>
        <ProductList products={this.state.products}/>
      </div>
    );
  }
}

export default App;
