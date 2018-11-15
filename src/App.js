import React, { Component } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList/ProductList';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      products: [],
      searchValue: '',
      test: null
    };
  }
  

  // componentDidMount () {
  //   const key = 'b671vmgBT8y4Jqx3KDTncBJ9O9aryjvsdy79x7Ez';

  //   axios.get('https://api.nal.usda.gov/ndb/search/?format=json&q=' + search + '&sort=n&max=25&offset=0&api_key=' + key)
  //     .then(response => {
  //       console.log(response)
  //     })
  // }

  onChange = (event) => {
    this.setState({searchValue: event.target.value})
  }

  onSubmit = (event) => {
    event.preventDefault()
    const food = this.state.searchValue;
    const key = process.env.REACT_APP_USDA_CODE;
    let results = null;
    let justNames = [];
    axios.get('https://api.nal.usda.gov/ndb/search/?format=json&q=' + food + '&max=15&sort=n&offset=0&api_key=' + key)
      .then(response => {
        results = (response.data['list']['item']);
      })
      .catch(error => {
        console.log('[after first then]: '  + error);
        alert('no results');
      })
      .then(function () {
        console.log(results);
        for(let i=0; i < results.length; i++){
          justNames.push(results[i]['name'])
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

  componentDidMount() {
    console.log('testing')
  }
  componentWillUpdate() {
    console.log('testing component will update')
  }



  render() {
    return (
      <div className="App">
        <form onSubmit={this.onSubmit}>
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
