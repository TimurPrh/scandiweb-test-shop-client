import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/header/Header';
import ModalAttributes from '../components/modalAttributes/ModalAttributes';
import Overlay from '../components/overlay/Overlay';
import ProductsList from '../components/productsList/ProductsList';

function mapStateToProps(state) {
  return {
    modalProduct: state.modalAttributesReducer.product
  };
}

class PLP extends Component {
  render() {
    return (
      <>
        <Header />
        <div className='container'>
          <ProductsList />
          {this.props.modalProduct.id ? <ModalAttributes /> : null}
        </div>
        <Overlay />
      </>
    );
  }
}

export default connect(
  mapStateToProps,
)(PLP);