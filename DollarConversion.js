import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

class DollarConversion extends Component {
    constructor() {
      super();
      this.state = {
          coins: [],
           /* direction: {
              TotalCoinSupply: 'asc'
          } */
      };
      //this.sortBy = this.sortBy.bind(this)
    }
    
      /* sortBy(key) {
        this.setState({
            coins: coins.sort( (a, b) => (
                this.state.direction[key] === 'asc'
                ? parseFloat(a[key] - parseFloat(b[key])
                : parseFloat(b[key] - parseFloat(a[key])
                ))
            direction: {
                [key]: this.state.direction[key] === 'asc'
                ? 'desc'
                : 'asc'
            }
        })
    } */
   
      componentDidMount() {
          fetch('https://min-api.cryptocompare.com/data/all/coinlist', {cache: "force-cache"})
              .then (results => {
                  return results.json();
              })
              .then(json => {
                  this.setState({ coins: Object.values(json.Data).slice(0, 50) });
                  console.log("state", this.state.coins);
                  //json.data.reduce...to get symbols
                  const symbols = Object.values(json.Data).slice(0, 50).reduce((prev, coin) => `${prev},${coin.Symbol}`, ``).substring(1);
                  return fetch(`https://min-api.cryptocompare.com/data/price?fsym=${symbols}&tsyms=USD,EUR`)
                  })
                  .then(results => {
                      return results.json();
                  })
                  .then(json => {
                      this.setState({ coins: [...this.state.coins, {id: this.state.coins.reduce((prev, coin) => `${prev},${coin.Symbol}`, ``).substring(1)} ] });
                    });
                }
   
      render() {
          return (
            <div className="DollarConversion">
              <header>
                <ul className="main-nav">
                    <li><NavLink exact to="/">Home</NavLink></li>
                    <li><NavLink to="/DollarConversion">Conversion Rate</NavLink></li>
                    <li><NavLink to="/BitcoinNewsfeed">Newsfeed</NavLink></li>
                </ul>
            </header>

            <div className="dollar-conversion-table">
                <table>
                    <caption>Crypto Coin Conversion</caption>
                    <tr>
                        <th>Coin Symbol</th>
                        <th>US Dollars</th>
                        <th>Euros</th>
                    </tr>
                    <tbody>
                        { 
                            this.state.coins.map(row => (
                                <tr>
                                    <td>{row.Symbol}</td>
                                    <td>{row.USD}</td>
                                    <td>{row.EUR}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
           </div>
          );
      }
   }

export default DollarConversion;