import React, { Component } from 'react';
import { connect } from 'react-redux';
import AttributeOptions from '../attributeOptions/AttributeOptions';
import Counter from '../counter/Counter';
import Decrement from './dec.svg'
import Increment from './inc.svg'
import './cart-list-item.scss'

function mapStateToProps(state) {
  return {
    selectedCurrency: state.selectedOptionsReducer.currency
  };
}

class CartListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentImage: 0
    }

    this.changeCurrentImage = this.changeCurrentImage.bind(this)
  }

  changeCurrentImage(type) {
    const len = this.props.cartItem.gallery.length - 1

    this.setState(state => {
      switch (type) {
        case "inc":
          if (state.currentImage === len) {
            return {currentImage: 0}
          }
          return {currentImage: state.currentImage + 1}
  
        case "dec":
          if (state.currentImage === 0) {
            return {currentImage: len}
          }
          return {currentImage: state.currentImage - 1}
      
        default:
          break;
      }
    })
  }

  render() {
    const getPrice = () => {
      const ind = this.props.cartItem.prices.findIndex(price => {
        return price.currency.label === this.props.selectedCurrency.label
      })
      return `${this.props.selectedCurrency.symbol}${this.props.cartItem.prices[ind].amount}`
    }
    const getAvailableOptions = (attribute) => {
      const ind = this.props.cartItem.availableAttributes.findIndex(available => {
        return available.id === attribute.id
      })
      return this.props.cartItem.availableAttributes[ind]
    }

    return (
      <li className='cart-list-item'>
        <div className='cart-list-item__description'>
          <div className='cart-list-item__description-brand'>
            {this.props.cartItem.brand}
          </div>
          <div className='cart-list-item__description-name'>
            {this.props.cartItem.name}
          </div>
          <div className='cart-list-item__description-price'>
            {getPrice()}
          </div>
          <div className='cart-list-item__description-attributes'>
            {this.props.cartItem.attributes.map(attribute => (
              <div className='cart-list-item__description-attribute' key={`${attribute.id}-${attribute.valueId}`}>
                <div className='cart-list-item__description-attribute-header'>
                  {attribute.name}:
                </div>
                <AttributeOptions selectedOptions={attribute} availableOptions={getAvailableOptions(attribute)} type="big"/>
              </div>
            ))}
          </div>
        </div>
        <div className='cart-list-item__quantity'>
          <Counter cartItem={this.props.cartItem} />
        </div>
        <div className='cart-list-item__image'>
          <img src={this.props.cartItem.gallery[this.state.currentImage]} alt={this.props.cartItem.name}/>
          <div className='cart-list-item__image-arrows' style={this.props.cartItem.gallery.length > 1 ? {} : {display:"none"}}>
            <button 
              className='cart-list-item__image-arrow'
              onClick={() => this.changeCurrentImage("dec")}
              >
              <img src={Decrement} alt="Decrement icon" />
            </button>
            <button 
              className='cart-list-item__image-arrow'
              onClick={() => this.changeCurrentImage("inc")}
              >
              <img src={Increment} alt="Increment icon" />
            </button>
          </div>
        </div>
      </li>
    );
  }
}

export default connect(
  mapStateToProps,
)(CartListItem);