import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCartAction } from '../../store/cartStore';
import { changeCartVisibleAction, changeOverlayVisibleAction } from '../../store/selectedOptionsStore';
import SmallCartListItem from '../smallCartListItem/SmallCartListItem';
import './small-cart-list.scss'

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

class SmallCartList extends Component {
  constructor(props) {
    super(props)

    this.order = this.order.bind(this)
  }

  order() {
    console.group('order')
    console.log(this.props.cart)
    console.groupEnd()
    this.props.setCart([])
    this.props.changeOverlayVisible(false)
    this.props.changeCartVisible(false)
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
      if (sum === 1) {
        sum += ' item'
      } else if (sum > 1) {
        sum += ' items'
      }
      return sum
    }

    const getTotalSum = () => {
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
      return `${this.props.selectedCurrency.symbol}${floorFloat(sum)}`
    }
    const getItemKey = (item) => {
      let key = item.id
      item.attributes.forEach(attr => {
        key += `_${attr.id}-${attr.valueId}`
      })
      return key
    }

    return (
      <div className='small-cart-list'>
        {this.props.cart.length > 0 ?
        <>
          <h3 className='small-cart-list__header'>
            <span className='small-cart-list__header-bold'>My bag</span>, {getQuantity()}
          </h3>
          <ul className='small-cart-list__list'>
            {this.props.cart.map(cartItem => {
              return <SmallCartListItem cartItem={cartItem} key={getItemKey(cartItem)} />
            })}
          </ul>
          <div className='small-cart-list__total'>
            <span className='small-cart-list__total-text'>Total</span>
            <span className='small-cart-list__total-sum'>{getTotalSum()}</span>
          </div>
          <div className='small-cart-list__buttons'>
            <Link to='/cart' className='small-cart-list__buttons-view-bag'>
              VIEW BAG
            </Link>
            <button 
              className='small-cart-list__buttons-check-out'
              onClick={this.order}
              >
              CHECK OUT
            </button>
          </div>
        </>
        :
        <div className='small-cart-list__header'>
          <span className='small-cart-list__header-bold'>My bag</span> is empty
        </div>
        }
        
      </div>
    );
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps,
)(SmallCartList);