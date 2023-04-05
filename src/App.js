import React, {Component} from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import CoinDetails from './CoinDetails';
import ReactDOM from 'react-dom';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      coins: [],
      currentPage: 0,
      perPage: 10,
      pageCount: 5
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handlePageClick = data => {
    const selectedPage = data.selected;
    const currentPage = selectedPage + 1;
    console.log(currentPage);
    this.setState({ currentPage }, () => {
      this.fetchCoins();
    });
    console.log(currentPage);
  };
  
  fetchCoins = () => {
    const { currentPage, perPage } = this.state;
    axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${currentPage}&sparkline=false&price_change_percentage=24h`
    )
      .then(response => {
        const coins = response.data;
        this.setState({ coins });
      })
      .catch(error => {
        console.error(error);
      });
  };
  
  componentDidMount() {
    this.fetchCoins();
  }

  
  render() {
    const { coins, currentPage, perPage, pageCount } = this.state;
    const coinList = coins.map((coin, index) => (
      <tr key={index}>
        <td> 
          <button 
          className='info'
          onClick={() => ReactDOM.render(<CoinDetails coinId={coin.id}/>, document.getElementById('root'))}>
          Info
          </button>
        </td>
        <td>{coin.name}</td>
        <td>{coin.symbol}</td>
        <td>{coin.current_price}</td>
        <td>{coin.high_24h}</td>
        <td>{coin.low_24h}</td>
        <td>{coin.price_change_percentage_24h}%</td>
      </tr>
    ));

    return (
          <div>
            <div className="header">
              <h2> <a href='/'>Cyberscope Test</a></h2>
            </div>
          <Container className='container'>
            <Row className="justify-content-md-center text-center">
            <Col >
            <div className="d-flex justify-content-between">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Symbol</th>
                  <th>Current Price</th>
                  <th>Highest Price (24h)</th>
                  <th>Lower Price (24h)</th>
                  <th>Price Change (24h)</th>
                </tr>
              </thead>
              <tbody>
                {coinList}
              </tbody>
            </table>
        <br />
      </div>
      <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          nextClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextLinkClassName={'page-link'}
          activeClassName={'active'}
          buttonClassName={'btn btn-light'}
        />
          </Col>
          </Row>
          </Container>
        <div className="footer">
        <span style={{color: '#666699'}}>Cyberscope Test</span>
        </div>
        </div>
    );
  }
}

export default App;
