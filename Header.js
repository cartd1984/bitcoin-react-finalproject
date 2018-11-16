import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <ul className="main-nav">
          <li>
            <NavLink exact to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/DollarConversion">Conversion Rate</NavLink>
          </li>
          <li>
            <NavLink to="/BitcoinNewsfeed">Newsfeed</NavLink>
          </li>
    </ul>
  </header>
);

export default Header;
