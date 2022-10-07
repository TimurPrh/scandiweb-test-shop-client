import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItemAction } from '../../store/cartStore';
import AttributeOptionsClickable from '../attributeOptionsClickable/AttributeOptionsClickable';
import './product-description.scss'

function mapStateToProps(state) {
  return {
    selectedCurrency: state.selectedOptionsReducer.currency
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addToCart: (item) => dispatch(addItemAction(item))
  }
}

class ProductDescription extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageIndex: 0,
      selectedAttributes: []
    }

    this.changeSelectedOption = this.changeSelectedOption.bind(this)
    this.changeMainImage = this.changeMainImage.bind(this)
  }

  componentDidMount() {
    const arr = this.props.product.attributes.map(attribute => {
      return {
        name: attribute.name,
        type: attribute.type,
        id: attribute.id,
        displayValue: attribute.items[0].displayValue,
        value: attribute.items[0].value,
        valueId: attribute.items[0].id
      }
    })
    this.setState(state => ({...state, selectedAttributes: arr}))
  }

  addToCart(e, product) {
    const attributes = product.attributes.map(attribute => {
      const ind = this.state.selectedAttributes.findIndex(selectedAttribute => {
        return selectedAttribute.id === attribute.id
      })
      const newAttr = {
        name: attribute.name,
        type: attribute.type,
        id: attribute.id,
        displayValue: this.state.selectedAttributes[ind].displayValue,
        value: this.state.selectedAttributes[ind].value,
        valueId: this.state.selectedAttributes[ind].valueId
      }

      return newAttr
    })

    const item = {
      brand: product.brand,
      name: product.name,
      id: product.id,
      gallery: product.gallery,
      prices: product.prices,
      availableAttributes: product.attributes,
      attributes
    }

    this.props.addToCart(item)
    
    // this.cartLinkRef.current.blur()
    // this.cartButtonRef.current.blur()
  }

  changeMainImage(index) {
    this.setState({imageIndex: index})
  }

  changeSelectedOption(option) {
    const ind = this.state.selectedAttributes.findIndex(attribute => {
      return attribute.id === option.id
    })
    const arr = this.state.selectedAttributes
    arr[ind] = option
    this.setState(state => ({...state, selectedAttributes: arr}))
  }

  render() {
    const getPrice = () => {
      const ind = this.props.product.prices.findIndex(elem => {
        return elem.currency.label === this.props.selectedCurrency.label
      })
      if (ind === -1) return
      return this.props.product.prices[ind].amount
    }

    const getSelectedAttributes = (id) => {
      const ind = this.state.selectedAttributes.findIndex(attribute => {
        return attribute.id === id
      })

      return this.state.selectedAttributes[ind]
    }

    const getStockClass = () => {
      if (this.props.product.inStock) {
        return 'product-description__stock'
      }
      return 'product-description__stock product-description__stock_not-available'
    }

    return (
      <div className='container'>
        <div className='product-description'>
          <div className='product-description__left'>
            {this.props.product.gallery.map((image, i) => (
              <img
                className='product-description__small-image'
                src={image} 
                alt={`${this.props.product.brand} ${this.props.product.name}`} 
                key={image}
                onClick={() => this.changeMainImage(i)}/>
            ))}
          </div>
          <div className='product-description__center'>
            <div className='product-description__main-image'>
              <div className={getStockClass()}>
                OUT OF STOCK
              </div>
              <img 
                src={this.props.product.gallery[this.state.imageIndex]} 
                alt={`${this.props.product.brand} ${this.props.product.name}`} 
                key={this.props.product.gallery[this.state.imageIndex]}/>
            </div>
            <div className='product-description__description'>
              <div  className='product-description__description-brand'>
                {this.props.product.brand}
              </div>
              <div  className='product-description__description-name'>
                {this.props.product.name}
              </div>
              <div className='product-description__attributes'>
                {this.props.product.attributes.length > 0 && this.props.product.attributes.map(attribute => (
                  <div className='product-description__attribute' key={attribute.id}>
                    <div className='product-description__attribute-header'>
                      {attribute.name}:
                    </div>
                    {this.state.selectedAttributes.length > 0 && 
                      <AttributeOptionsClickable availableOptions={attribute} selectedOption={getSelectedAttributes(attribute.id)} changeSelectedOption={this.changeSelectedOption}/>
                    }
                  </div>
                ))}
              </div>
              <div className='product-description__price'>
                <div className='product-description__price-header'>
                  PRICE:
                </div>
                <div className='product-description__price-number'>
                  {this.props.selectedCurrency.symbol}{getPrice()}
                </div>
              </div>
              <button 
                className='product-description__add'
                onClick={(e) => this.addToCart(e, this.props.product)}
                disabled={!this.props.product.inStock}
                >
                ADD TO CART
              </button>
              <div className='product-description__text' dangerouslySetInnerHTML={{__html: this.props.product.description}}>
              </div>
            </div>
          </div>
          <div className='product-description__right'></div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps, 
)(ProductDescription);