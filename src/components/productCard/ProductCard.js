import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItemAction } from '../../store/cartStore';
import { changeModalProductAction, changeModalVisibleAction, changeProductScrollTopAction } from '../../store/modalAttributesStore';
import { changeOverlayVisibleAction } from '../../store/selectedOptionsStore';
import Cart from './cart.svg'
import './product-card.scss'

function mapStateToProps(state) {
  return {
    selectedCurrency: state.selectedOptionsReducer.currency
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addToCart: (item) => dispatch(addItemAction(item)),
    changeModalProduct: (item) => dispatch(changeModalProductAction(item)),
    changeOverlayVisible: (bool) => dispatch(changeOverlayVisibleAction(bool)),
    changeModalVisible: (bool) => dispatch(changeModalVisibleAction(bool)),
    changeProductScrollTop: (top) => dispatch(changeProductScrollTopAction(top))
  }
}

class ProductCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFocused: false
    
    }
    this.focusHandle = this.focusHandle.bind(this)
    this.enterHandle = this.enterHandle.bind(this)
    this.leaveHandle = this.leaveHandle.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
    this.cartButtonRef = React.createRef();
    this.cartLinkRef = React.createRef();
  }

  focusHandle(e) {
    this.setState({isFocused: true})
  }
  enterHandle(e) {
    this.cartButtonRef.current.blur()
    setTimeout(() => {
      this.setState({isFocused: true})
    }, 0)
  }
  leaveHandle(e) {
    if (!(e.target === this.cartButtonRef.current && e.relatedTarget === this.cartLinkRef.current) &&
    !(e.target === this.cartLinkRef.current && e.relatedTarget === this.cartButtonRef.current) &&
    !(e.type === 'blur' && !e.relatedTarget)) {
      this.setState({isFocused: false})
      this.cartLinkRef.current.blur()
      this.cartButtonRef.current.blur()
    }
    
  }
  addToCart(e, product) {
    if (this.props.product.inStock) {
      if (product.attributes.length > 0) {
        this.props.changeProductScrollTop(document.documentElement.scrollTop)
        this.props.changeModalProduct(product)

        this.props.changeOverlayVisible(true)
        this.props.changeModalVisible(true)
  
        this.cartLinkRef.current.blur()
        this.cartButtonRef.current.blur()
      } else {
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
      }
    }
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.cartLinkRef && !this.cartLinkRef.current.contains(event.target)) {
      this.leaveHandle(event)
    }
  }

  render() {
    const getPrice = () => {
      const ind = this.props.product.prices.findIndex(elem => elem.currency.label === this.props.selectedCurrency.label)

      if (ind !== -1) {
        return `${this.props.product.prices[ind].currency.symbol}${this.props.product.prices[ind].amount}`
      }
    }

    const getCartClass = () => {
      if (this.state.isFocused) {
        return 'product-card__cart product-card__cart_active'
      }
      return 'product-card__cart'
    }
    const getLinkClass = () => {
      let out = 'product-card__link'
      if (this.state.isFocused) {
        out += ' product-card__link_active'
      }
      if (!this.props.product.inStock) {
        out += ' product-card__link_out-of-stock'
      }
      return out
    }
    const getStockClass = () => {
      if (this.props.product.inStock) {
        return 'product-card__stock'
      }
      return 'product-card__stock product-card__stock_not-available'
    }

    return (
      <div className='product-card'
        onMouseEnter={this.enterHandle}
        onMouseLeave={this.leaveHandle}
        ref={this.cartLinkRef}
        >
        <Link 
          to={`/products/${this.props.product.id}`}
          className={getLinkClass()}
          onFocus={this.focusHandle}
          onBlur={this.leaveHandle}
          >
          <div className='product-card__image'>
            <div className={getStockClass()}>
              OUT OF STOCK
            </div>
            <img src={this.props.product.gallery[0]} alt={this.props.product.name}/>
          </div>
          <div className='product-card__name'>
            {this.props.product.brand} {this.props.product.name}
          </div>
          <div className='product-card__price'>
            {getPrice()}
          </div>
        </Link>
        
        <button 
          className={getCartClass()}
          onClick={(e) => this.addToCart(e, this.props.product)}
          onFocus={this.focusHandle}
          onBlur={this.leaveHandle}
          ref={this.cartButtonRef}
          disabled={!this.props.product.inStock}
          >
          <img src={Cart} alt="Cart icon" />
        </button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps,
)(ProductCard);