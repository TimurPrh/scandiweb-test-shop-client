import React, { Component } from 'react';
import Header from '../components/header/Header';
import Overlay from '../components/overlay/Overlay';
import ProductsList from '../components/productsList/ProductsList';

class PLP extends Component {
  render() {
    return (
      <>
        <Header />
        <div className='container'>
          <ProductsList />
        </div>
        <Overlay />
      </>
    );
  }
}

export default PLP;