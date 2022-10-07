import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeCategoryAction } from '../../store/selectedOptionsStore';
import './header-categories.scss'

function mapStateToProps(state) {
  return {
    selectedCategory: state.selectedOptionsReducer.category
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeCategory: (name) => dispatch(changeCategoryAction(name))
  }
}

class HeaderCategories extends Component {

  componentDidMount() {
    if (this.props.selectedCategory === undefined) {
      this.props.changeCategory(this.props.categories[0].name)
    }
  }

  render() {
    const getClassName = (name) => {
      let res = 'header-categories__item'

      if (name === this.props.selectedCategory) {
        res += ' header-categories__item_active'
      }

      return res
    }

    return (
      <div className='header-categories'>
        <>
          {this.props.categories.map(cat => (
            <button 
              className={getClassName(cat.name)} 
              key={cat.name}
              onClick={(e) => {
                this.props.changeCategory(cat.name)
                e.target.blur()
              }}>
              {cat.name}
            </button>
          ))}
        </>
      </div>
    );
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps,
)(HeaderCategories);