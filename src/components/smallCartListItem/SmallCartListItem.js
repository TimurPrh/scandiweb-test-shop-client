import React, { Component } from 'react';
import { connect } from 'react-redux';
import AttributeOptions from '../attributeOptions/AttributeOptions';
import SmallCounter from '../smallCounter/SmallCounter';
import './small-cart-list-item.scss'

function mapStateToProps(state) {
  return {
    selectedCurrency: state.selectedOptionsReducer.currency
  };
}

class SmallCartListItem extends Component {
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
      <li className='small-cart-list-item'>
        <div className='small-cart-list-item__description'>
          <div className='small-cart-list-item__description-brand'>
            {this.props.cartItem.brand}
          </div>
          <div className='small-cart-list-item__description-name'>
            {this.props.cartItem.name}
          </div>
          <div className='small-cart-list-item__description-price'>
            {getPrice()}
          </div>
          <div className='small-cart-list-item__description-attributes'>
            {this.props.cartItem.attributes.map(attribute => (
              <div className='small-cart-list-item__description-attribute' key={`${attribute.id}-${attribute.valueId}`}>
                <div className='small-cart-list-item__description-attribute-header'>
                  {attribute.name}:
                </div>
                <AttributeOptions selectedOptions={attribute} availableOptions={getAvailableOptions(attribute)} type="small"/>
              </div>
            ))}
          </div>
        </div>
        <div className='small-cart-list-item__quantity'>
          <SmallCounter cartItem={this.props.cartItem} />
        </div>
        <div className='small-cart-list-item__image'>
          <img src={this.props.cartItem.gallery[0]} alt={this.props.cartItem.name}/>
        </div>
      </li>
    );
  }
}

export default connect(
  mapStateToProps,
)(SmallCartListItem);