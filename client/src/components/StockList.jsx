import React from 'react';
import StockEntry from './StockEntry.jsx';
import {Grid} from 'semantic-ui-react';

class StockList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <Grid centered>
        {this.props.stocks.map(stock => {
          return <StockEntry key={stock.name} onStockListClick={this.props.onStockListClick} stock={stock} />;
        })}
      </Grid>
    );
  }
}

export default StockList;