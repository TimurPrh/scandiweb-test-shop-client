import React, { Component } from 'react';
import { connect } from 'react-redux';
import { decrementCartItemAction, incrementCartItemAction } from '../../store/cartStore';
import Plus from './plus.svg'
import Minus from './minus.svg'
import './counter.scss'

function mapStateToProps(state) {
  return {
    cart: state.cartReducer.cart,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    incrementCartItem: (item) => dispatch(incrementCartItemAction(item)),
    decrementCartItem: (item) => dispatch(decrementCartItemAction(item))
  }
}

class SmallCounter extends Component {
  render() {
    const getQuantity = () => {
      const ind = this.props.cart.findIndex((item) => {
        if (item.id === this.props.cartItem.id) {
          return item.attributes.every((attribute, i) => {
            const attrInd = this.props.cartItem.attributes.findIndex(elem => elem.id === attribute.id)
            return attribute.valueId === this.props.cartItem.attributes[attrInd].valueId
          })
        }
        return false
      })
      return this.props.cart[ind].quantity
    }

    return (
      <div className='small-counter'>
        <button 
          onClick={() => this.props.incrementCartItem(this.props.cartItem)}
          className='small-counter__plus'
          ><img src={Plus} alt="Plus icon"/></button>
        <div className='small-counter__count'>
          {getQuantity()}
        </div>
        <button 
          onClick={() => this.props.decrementCartItem(this.props.cartItem)}
          className='small-counter__minus'
          ><img src={Minus} alt="Minus icon" /></button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps,
)(SmallCounter);