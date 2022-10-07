import React, { Component } from 'react';
import CartContent from '../components/cartContent/CartContent';
import Header from '../components/header/Header';
import Overlay from '../components/overlay/Overlay';

class Cart extends Component {
  render() {
    return (
      <> 
        <Header />
        <CartContent />
        <Overlay />
      </>
    );
  }
}

export default Cart;