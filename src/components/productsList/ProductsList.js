import { Query } from '@apollo/client/react/components';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GET_CATEGORY } from '../../query/items';
import { changeListOffsetAction } from '../../store/modalAttributesStore';
import Error from '../error/Error';
import Loading from '../loading/Loading';
import ProductCard from '../productCard/ProductCard';
import './products-list.scss';

function mapStateToProps(state) {
  return {
    selectedCategory: state.selectedOptionsReducer.category
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeListOffset: (offset) => dispatch(changeListOffsetAction(offset))
  };
}

class ProductsList extends Component {
  constructor(props) {
    super(props)
    this.list = React.createRef()
  }

  componentDidMount() {
    this.props.changeListOffset(this.list.current.getBoundingClientRect().top)
  }

  componentDidUpdate() {
    this.props.changeListOffset(this.list.current.getBoundingClientRect().top)
  }

  render() {
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
      <div className='products-list' ref={this.list}>
        <Query query={GET_CATEGORY}  variables={{name: this.props.selectedCategory}}>
          {({ loading, error, data }) => {
            if (error) return <Error />
            if (loading) return <Loading />
            return (
              data && 
              <>
                <h2 className='products-list__header'>{capitalizeFirstLetter(this.props.selectedCategory)}</h2>
                <div className='products-list__wrapper'>
                  {data.category.products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )
          }}
        </Query>
      </div>
    );
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps,
)(ProductsList);