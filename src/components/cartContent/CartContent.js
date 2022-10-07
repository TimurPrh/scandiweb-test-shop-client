import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCartAction } from '../../store/cartStore';
import { changeCartVisibleAction, changeOverlayVisibleAction } from '../../store/selectedOptionsStore';
import CartListItem from '../cartListItem/CartListItem';
import './cart-content.scss'

function mapStateToProps(state) {
  return {
    cart: state.cartReducer.cart,
    selectedCurrency: state.selectedOptionsReducer.currency
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCart: (cart) => dispatch(setCartAction(cart)),
    changeOverlayVisible: (bool) => dispatch(changeOverlayVisibleAction(bool)),
    changeCartVisible: (bool) => dispatch(changeCartVisibleAction(bool)),
  }
}

class CartContent extends Component {
  constructor(props) {
    super(props)

    this.order = this.order.bind(this)
  }

  order() {
    console.group('order')
    console.log(this.props.cart)
    console.groupEnd()
    this.props.setCart([])
  }

  render() {
    function floorFloat(value, exp = -2) {
      // Если степень не определена, либо равна нулю...
      if (typeof exp === 'undefined' || +exp === 0) {
        return Math.floor(value);
      }
      value = +value;
      exp = +exp;
      // Если значение не является числом, либо степень не является целым числом...
      if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN;
      }
      // Сдвиг разрядов
      value = value.toString().split('e');
      value = Math.floor(+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
      // Обратный сдвиг
      value = value.toString().split('e');
      return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }

    const getQuantity = () => {
      let sum = this.props.cart.reduce(
        (previous, current) =>  previous + current.quantity, 0
      );
      return sum
    }
    const getTotalSum = (tax) => {
      const selected = this.props.cart.map(cartItem => {
        const newItem = {quantity: cartItem.quantity}
        const priceInd = cartItem.prices.findIndex(elem => {
          return elem.currency.label === this.props.selectedCurrency.label
        })
        newItem.price = cartItem.prices[priceInd].amount
        return newItem
      })
      const sum = selected.reduce(
        (previous, current) =>  previous + current.quantity * current.price, 0
      );
      return `${this.props.selectedCurrency.symbol}${floorFloat(sum * tax / 100)}`
    }

    const getItemKey = (item) => {
      let key = item.id
      item.attributes.forEach(attr => {
        key += `_${attr.id}-${attr.valueId}`
      })
      return key
    }

    return (
      <div className='container'>
        <div className='cart-content'>
          {this.props.cart.length > 0 ?
          <>
            <h2 className='cart-content__header'>
              CART
            </h2>
            <div className='cart-content__line'></div>
            <ul className='cart-content__list'>
              {this.props.cart.map(cartItem => (
                <React.Fragment key={getItemKey(cartItem)}>
                  <CartListItem cartItem={cartItem} />
                  <div className='cart-content__line'></div>
                </React.Fragment>
              ))}
            </ul>
            <div className='cart-content__details'>
              <div className='cart-content__details-text'>
                Tax 21%:
              </div>
              <div className='cart-content__details-number'>
                {getTotalSum(21)}
              </div>
              <div className='cart-content__details-text'>
                Quantity:
              </div>
              <div className='cart-content__details-number'>
                {getQuantity()}
              </div>
              <div className='cart-content__details-text'>
                Total:
              </div>
              <div className='cart-content__details-number'>
                {getTotalSum(100)}
              </div>
            </div>
            <button
              className='cart-content__order'
              onClick={this.order}
              >
                ORDER
            </button>
          </>
          :
          <h2 className='cart-content__header'>
            CART <span>is empty</span>
          </h2>
          }
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps,
)(CartContent);