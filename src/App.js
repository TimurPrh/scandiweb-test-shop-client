import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PLP from './pages/PLP';
import PDP from './pages/PDP'
import Cart from './pages/Cart';
import { setCartAction } from './store/cartStore';
import { changeCategoryAction, changeCurrencyAction } from './store/selectedOptionsStore';
import './App.css';

function mapStateToProps(state) {
  return {
    cart: state.cartReducer.cart,
    selectedCategory: state.selectedOptionsReducer.category,
    selectedCurrency: state.selectedOptionsReducer.currency
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeCategory: (name) => dispatch(changeCategoryAction(name)),
    changeCurrency: (name) => dispatch(changeCurrencyAction(name)),
    setCart: (cart) => dispatch(setCartAction(cart))
  }
}

class App extends Component {
  componentWillMount() {
    const options = JSON.parse(localStorage.getItem('options'))
    if (options && options.category && options.currency && options.cart) {
      this.props.changeCategory(options.category)
      this.props.changeCurrency(options.currency)
      this.props.setCart(options.cart)
    }
  }

  componentDidUpdate() {
    const options = {
      cart: this.props.cart,
      category: this.props.selectedCategory,
      currency: this.props.selectedCurrency
    }
    localStorage.setItem('options', JSON.stringify(options))
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route index element={<PLP />} />
          <Route path="/products/:id" element={<PDP />} />
          <Route path="cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

// export default App;

export default connect(
  mapStateToProps, mapDispatchToProps,
)(App);