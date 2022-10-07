import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeCurrencyAction } from '../../store/selectedOptionsStore';
import Arrow from './arrow.svg'
import './currency-switcher.scss'

function mapStateToProps(state) {
  return {
    selectedCurrency: state.selectedOptionsReducer.currency
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeCategory: (currency) => dispatch(changeCurrencyAction(currency))
  }
}

class CurrencySwitcher extends Component {
  constructor(props) {
    super(props)
    this.state = {
      optionsVisible: false
    }

    this.listRef = React.createRef();
    this.headerRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    if (!this.props.selectedCurrency) {
      this.props.changeCategory({
        label: this.props.currencies[0].label,
        symbol: this.props.currencies[0].symbol
      })
    }

    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.listRef && this.headerRef && !this.listRef.current.contains(event.target) && !this.headerRef.current.contains(event.target)) {
      if (this.state.optionsVisible) {
        this.setState({optionsVisible: false})
      }
    }
  }
  
  render() {

    const getListClass = () => {
      if (this.state.optionsVisible) {
        return 'currency-switcher__list currency-switcher__list_visible'
      }
      return 'currency-switcher__list'
    }

    const getArrowClass = () => {
      if (this.state.optionsVisible) {
        return 'currency-switcher__arrow currency-switcher__arrow_active'
      }
      return 'currency-switcher__arrow'
    }

    return (
      <div className='currency-switcher'>
        <button 
          className='currency-switcher__header'
          onClick={() => {
            this.setState(state => ({ optionsVisible: !state.optionsVisible }))
          }}
          ref={this.headerRef}>
          <div className='currency-switcher__symbol'>
            {this.props.selectedCurrency.symbol}
          </div>
          <div className={getArrowClass()}>
            <img src={Arrow} alt="Arrow" />
          </div>
        </button>
        <ul className={getListClass()} ref={this.listRef}>
          {this.props.currencies.map(currency => (
            <button
              key={currency.label} 
              onClick={() => {
                this.props.changeCategory({
                  label: currency.label,
                  symbol: currency.symbol
                })
                this.setState({optionsVisible: false})
              }}
              >
              <li 
                className='currency-switcher__list-item'
                >
                {`${currency.symbol} ${currency.label}`}
              </li>
            </button>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps,
)(CurrencySwitcher);