import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CoinPage = ({ coinId }) => {
  const [coinData, setCoinData] = useState(null);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`);
        setCoinData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCoinData();
  }, [coinId]);

  if (!coinData) {
    return <div>Loading...</div>;
  }

  const { name, description, market_data } = coinData;
  const { current_price, high_24h, low_24h } = market_data;

  const priceChanges = {
    '24h': market_data.price_change_percentage_24h,
    '7d': market_data.price_change_percentage_7d,
    '14d': market_data.price_change_percentage_14d,
    '1m': market_data.price_change_percentage_30d,
    '2m': market_data.price_change_percentage_60d,
    '200d': market_data.price_change_percentage_200d,
    '1y': market_data.price_change_percentage_1y,
  };

  return (
    <div>
      <div className="header">
        <h2> <a href='/'>Cyberscope Test</a></h2>
      </div>
      <div className='coinDetails'>
        <h2 >{name}</h2>
        <p dangerouslySetInnerHTML={{ __html: description.en }}></p>
        <h3 style={{marginTop:50, marginBottom: 50, color: 'green', fontSize: 32}}>Current Price: {current_price.usd}$</h3>
        <h3 style={{marginTop:20, marginBottom: 20, fontSize: 30}}>Highest Price on Last Day: {high_24h.usd}$</h3>
        <h3 style={{marginTop:20, marginBottom: 50, fontSize: 30}}>Lowest Price on Last Day: {low_24h.usd}$</h3>
        {Object.entries(priceChanges).map(([key, value]) => (
          <div key={key}>
            <h4>Price Change in the last {key}</h4>
            <p>{value}%</p>
          </div>
        ))}
      </div>
      <div className="footer">
        <span style={{color: '#666699'}}>Cyberscope Test</span>
        </div>
    </div>
  );
};

export default CoinPage;
