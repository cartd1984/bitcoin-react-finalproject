import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

import './App.css';
//import BitcoinTable from './BitcoinTable';
//import App from "./App";



class BitcoinHome extends Component {
    constructor(props) {
      super(props);
      this.state = {
          coins: [],
          direction: {
              TotalCoinSupply: 'asc'
          }
      };
      this.sortBy = this.sortBy.bind(this)
    }

    sortBy(key) {
        this.setState({
            coins: this.state.coins.sort( (a, b) => (
                this.state.direction[key] === 'asc'
                ? parseFloat(a[key]) - parseFloat(b[key]) 
                : parseFloat(b[key]) - parseFloat(a[key])
                )),
            direction: {
                [key]: this.state.direction[key] === 'asc'
                ? 'desc'
                : 'asc'
            }
        })
    } 

   
    componentDidMount() {
        fetch('https://min-api.cryptocompare.com/data/all/coinlist', {cache: "force-cache"})
            .then (results => {
                return results.json();
            })
            .then(json => {
                this.setState({ coins: Object.values(json.Data).slice(0, 50) });
                console.log("state", this.state.coins);
            })
    }
   
      render() {
          return (
            <div className="App">
            <header>
                <ul className="main-nav">
                    <li><NavLink exact to="/">Home</NavLink></li>
                    <li><NavLink to="/DollarConversion">Conversion Rate</NavLink></li>
                    <li><NavLink to="/BitcoinNewsfeed">Newsfeed</NavLink></li>
                </ul>
            </header>
            <table>
                   <thead>
                   <tr>
                       <th>Coin Name</th>
                       <th>Coin Image</th>
                       <th>
                           <button onClick={ () => this.coins.sortBy('TotalCoinSupply') }>
                                Total Coin Supply
                            </button>
                        </th>
                       <th>Coin Link</th>
                   </tr>
                   </thead>
                   <tbody>
                       { 
                           this.state.coins.map(row => (
                               <tr key={row.CoinName}>
                                   <td>{row.CoinName}</td>
                                   <td>
                                       <img src={`https://www.cryptocompare.com${row.ImageUrl}`} alt='' />
                                   </td>
                                   <td>{row.TotalCoinSupply}</td>
                                   <td>{row.Url}</td>
                               </tr>
                           ))
                       }
                   </tbody>
            </table>
           </div>
          );
      }
   }

export default BitcoinHome; 