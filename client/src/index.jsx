import React from 'react';
import ReactDOM from 'react-dom';
import StockList from './components/StockList.jsx';
import StockFeed from './components/StockFeed.jsx';
import SearchBar from './components/SearchBar.jsx';
import {Divider} from 'semantic-ui-react';
import $ from 'jquery';
import Chart from './components/Chart.jsx';
import Summary from './components/Summary.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myStocks: [],
      allStocks: [],
      currentStock: {}
    };
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    $.ajax({
      method: 'GET',
      url: '/stock/send-all',
      success: (data) => {
        this.setState({
          allStocks: data,
          currentStock: data[0]
        });
      }
    });
  }
  
  getPortfolio() {
    $.ajax({
      method: 'GET',
      url: '/portfolio/send-all',
      success: (data) => {
        console.log(data);
        // this.setState({
        //   myStocks: value
        // });
      },
      error: (data) => {
        console.log(data);
      }
    });
  }

  onTitleClick(value) {
    this.setState({
      currentStock: value
    });
  }

  buyStock(value) {
    // let myStocks = this.state.myStocks.slice();
    // myStocks.push(value);
   
    // let allStocks = this.state.allStocks.slice();
    // for (let i = 0; i < allStocks.length; i++) {
    //   if (allStocks[i].name === value.name) {
    //     allStocks.splice(i, 1);
    //   }
    // }

    // this.setState({
    //   myStocks: myStocks,
    //   allStocks: allStocks
    // });

    $.ajax({
      method: 'POST',
      url: '/stock/buy',
      data: {stock: value},
      success: (data) => {
        console.log('bought!');
      },
      error: (data) => {
        console.log(data);
      }
    });

  }

  sellStock(value) {
    // let myStocks = this.state.myStocks.slice();
    // for (let i = 0; i < myStocks.length; i++) {
    //   if (myStocks[i].name === value.name) {
    //     myStocks.splice(i, 1);
    //   }
    // }
    // this.setState({
    //   myStocks: myStocks
    // });

    $.ajax({
      method: 'POST',
      url: '/stock/sell',
      data: {stock: value},
      success: (data) => {
        console.log('sell!');
      },
      error: (data) => {
        console.log(data);
      }
    });
  }

  searchStocks(term) {
    console.log('Sent this to the server:', term);
    $.ajax({
      method: 'GET',
      url: `/stocks?term=${term}`,
      success: (data) => {
        console.log(data);
      }
    });
  }

  render () {
    return (
      <div>
        <SearchBar searchStocks={this.searchStocks} />
        <Chart stock={this.state.currentStock} /> 
        <StockList stocks={this.state.myStocks} onTitleClick={this.onTitleClick.bind(this)} onStockClick={this.sellStock.bind(this)} />
        <Divider />
        <StockFeed stocks={this.state.allStocks} onTitleClick={this.onTitleClick.bind(this)} onStockClick={this.buyStock.bind(this)} />
        <Summary />

      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));