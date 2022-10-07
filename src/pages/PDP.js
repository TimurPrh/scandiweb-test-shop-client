import { Query } from '@apollo/client/react/components';
import React, { Component } from 'react';
import Header from '../components/header/Header';
import Overlay from '../components/overlay/Overlay';
import ProductDescription from '../components/productDescription/ProductDescription';
import withRouter from '../components/withRouter/withRouter';
import { GET_PRODUCT } from '../query/items';

class PDP extends Component {  
  render() {
    return (
      <>
        <Header />
        <Query query={GET_PRODUCT}  variables={{id: this.props.params.id}}>
          {({ loading, error, data }) => {
            return (
              data && 
              <ProductDescription product={data.product} />
            )
          }}
        </Query>
        <Overlay />
      </>
    );
  }
}

export default withRouter(PDP);