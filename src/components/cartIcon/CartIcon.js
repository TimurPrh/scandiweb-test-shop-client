import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeCartVisibleAction, changeOverlayVisibleAction } from '../../store/selectedOptionsStore';
import SmallCartList from '../smallCartList/SmallCartList';
import Cart from './cart.svg'
import './cart-icon.scss'

function mapStateToProps(state) {
  return {
    cart: state.cartReducer.cart,
    isVisibleCart: state.selectedOptionsReducer.isVisibleCart
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeOverlayVisible: (bool) => dispatch(changeOverlayVisibleAction(bool)),
    changeCartVisible: (bool) => dispatch(changeCartVisibleAction(bool))
  }
}

class CartIcon extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cartListVisible: false
    }

    this.listRef = React.createRef();
    this.headerRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  cartClickHandle() {
    this.props.changeCartVisible(!this.props.isVisibleCart)
    this.props.changeOverlayVisible(!this.props.isVisibleCart)
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.listRef && this.headerRef && !this.listRef.current.contains(event.target) && !this.headerRef.current.contains(event.target)) {
      if (this.props.isVisibleCart) {
        this.cartClickHandle()
      }
    }
  }

  render() {

    const getQuantity = () => {
      let sum = 0
      if (this.props.cart.length > 0) {
        sum = this.props.cart.reduce(
          (previous, current) =>  previous + current.quantity, 0
        );
      }
      return sum
    }

    const getListClass = () => {
      if (this.props.isVisibleCart) {
        return 'cart-icon__list cart-icon__list_visible'
      }
      return 'cart-icon__list'
    }

    return (
      <div className='cart-icon'>
        <button 
          ref={this.headerRef}
          className='cart-icon__header'
          onClick={() => this.cartClickHandle()}>
          <img src={Cart} alt="Cart icon" />
          <div className={this.props.cart.length > 0 ? 'cart-icon__quantity' : 'cart-icon__quantity_empty'}>
            {this.props.cart.length > 0 && getQuantity()}
          </div>
        </button>
        <div
          ref={this.listRef} 
          className={getListClass()}>
          <SmallCartList />
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps,
)(CartIcon);