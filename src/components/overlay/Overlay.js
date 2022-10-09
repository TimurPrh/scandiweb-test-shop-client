import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeCartVisibleAction, changeOverlayVisibleAction } from '../../store/selectedOptionsStore';
import './overlay.scss'

function mapStateToProps(state) {
  return {
    isVisibleOverlay: state.selectedOptionsReducer.isVisibleOverlay
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeOverlayVisible: (bool) => dispatch(changeOverlayVisibleAction(bool)),
    changeCartVisible: (bool) => dispatch(changeCartVisibleAction(bool))
  }
}

class Overlay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      height: 0
    }
  }

  componentDidUpdate() {
    this.setState(state => {
      if (state.height !== document.documentElement.scrollHeight - 80 || state.width !== document.documentElement.scrollWidth) {
        return {height: document.documentElement.scrollHeight - 80, width: document.documentElement.scrollWidth}
      }
    })
  }

  componentWillUnmount() {
    this.props.changeOverlayVisible(false)
    this.props.changeCartVisible(false)
  }

  render() {
    return (
      <div 
        className={this.props.isVisibleOverlay ? 'overlay overlay_active' : 'overlay'}
        style={{height: this.state.height, width: this.state.width}}
        >
        
      </div>
    );
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps, 
)(Overlay);