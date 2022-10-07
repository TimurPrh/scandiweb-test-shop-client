import React, { Component } from 'react';
import HeaderCategories from '../headerCategories/HeaderCategories';
import CurrencySwitcher from '../currencySwitcher/CurrencySwitcher';
import CartIcon from '../cartIcon/CartIcon';
import { Query } from '@apollo/client/react/components';
import { GET_ALL_CATEGORIES, GET_ALL_CURRENCIES } from '../../query/items';
import { Link } from 'react-router-dom';
import Logo from './logo.svg'
import './header.scss'

class Header extends Component {
  render() {
    return (
      <header className=' header container'>
        <div className='header__categories'>
          <Query query={GET_ALL_CATEGORIES}>
            {({ loading, error, data }) => {
              return (
                data && <HeaderCategories categories={data.categories} />
              )
            }}
          </Query>
        </div>
        <div className='header__logo'>
          <Link to="/">
            <img src={Logo} alt="Brand logo" />
          </Link>
        </div>
        <div className='header__right'>
          <div className='header__currency-switcher'>
            <Query query={GET_ALL_CURRENCIES}>
              {({ loading, error, data }) => {
                return (
                  data && <CurrencySwitcher currencies={data.currencies} />
                )
              }}
            </Query>
          </div>
          <div className='header__cart-icon'>
            <CartIcon />
          </div>
        </div>
      </header>
    );
  }
}

export default Header;