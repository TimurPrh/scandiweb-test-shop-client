import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItemAction } from '../../store/cartStore';
import { changeModalProductAction, changeModalVisibleAction } from '../../store/modalAttributesStore';
import { changeOverlayVisibleAction } from '../../store/selectedOptionsStore';
import AttributeOptionsClickable from '../attributeOptionsClickable/AttributeOptionsClickable';
import './modal-attributes.scss'

function mapStateToProps(state) {
  return {
    selectedCurrency: state.selectedOptionsReducer.currency,
    isVisibleModal: state.modalAttributesReducer.isVisibleModal,
    product: state.modalAttributesReducer.product,
    productsListOffset: state.modalAttributesReducer.productsListOffset,
    productScrollTop: state.modalAttributesReducer.productScrollTop
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeOverlayVisible: (bool) => dispatch(changeOverlayVisibleAction(bool)),
    changeModalVisible: (bool) => dispatch(changeModalVisibleAction(bool)),
    addToCart: (item) => dispatch(addItemAction(item)),
    changeModalProduct: (item) => dispatch(changeModalProductAction(item))
  };
}

class ModalAttributes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedAttributes: [],
      productId: '',
      marginTop: 0
    }

    this.modalCardRef = React.createRef()

    this.changeSelectedOption = this.changeSelectedOption.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  componentDidMount() {
    let marginTop = this.props.productScrollTop - this.props.productsListOffset + 20
    if (marginTop < 0) {
      marginTop = 0
    }
    this.setState(state => ({...state, marginTop}))

    document.addEventListener("mousedown", this.handleClickOutside);

    if (Object.keys(this.props.product).length !== 0) {
      this.setState(state => {
        if (state.name === '' || state.productId !== this.props.product.id) {
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
          return {...state, selectedAttributes: arr, productId: this.props.product.id}
        }
      })
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.modalCardRef && !this.modalCardRef.current.contains(event.target)) {
      this.props.changeOverlayVisible(false)
      this.props.changeModalVisible(false)
      this.props.changeModalProduct({})
    }
  }

  changeSelectedOption(option) {
    const ind = this.state.selectedAttributes.findIndex(attribute => {
      return attribute.id === option.id
    })
    const arr = this.state.selectedAttributes
    arr[ind] = option
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
    this.props.changeOverlayVisible(false)
    this.props.changeModalVisible(false)
    this.props.changeModalProduct({})
  }

  render() {
    if (Object.keys(this.props.product).length === 0) return <div ref={this.modalCardRef}></div>

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

    return (
      <div 
        style={{marginTop: this.state.marginTop}}
        className={this.props.isVisibleModal ? 'modal-attributes modal-attributes_visible' : 'modal-attributes'}>
        <div ref={this.modalCardRef} className='modal-attributes__card'>
          <div  className='modal-attributes__select-text'>
            Please, select options
          </div>
          <div  className='modal-attributes__brand'>
            {this.props.product.brand}
          </div>
          <div  className='modal-attributes__name'>
            {this.props.product.name}
          </div>
          <div className='modal-attributes__attributes'>
            {this.props.product.attributes.length > 0 && this.props.product.attributes.map(attribute => (
              <div className='modal-attributes__attribute' key={attribute.id}>
                <div className='modal-attributes__attribute-header'>
                  {attribute.name}:
                </div>
                {this.state.selectedAttributes.length > 0 && 
                  <AttributeOptionsClickable availableOptions={attribute} selectedOption={getSelectedAttributes(attribute.id)} changeSelectedOption={this.changeSelectedOption}/>
                }
              </div>
            ))}
          </div>
          <div className='modal-attributes__price'>
            <div className='modal-attributes__price-header'>
              PRICE:
            </div>
            <div className='modal-attributes__price-number'>
              {this.props.selectedCurrency.symbol}{getPrice()}
            </div>
          </div>
          <button 
            className='modal-attributes__add'
            onClick={(e) => this.addToCart(e, this.props.product)}
            disabled={!this.props.product.inStock}
            >
            ADD TO CART
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(ModalAttributes);