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

  componentDidMount() {
    this.setState({height: document.documentElement.scrollHeight - 80})
  }

  componentDidUpdate() {
    this.setState(state => {
      if (state.height !== document.documentElement.scrollHeight - 80) {
        return {height: document.documentElement.scrollHeight - 80}
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
        style={{height: this.state.height}}
        >
        
      </div>
    );
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps, 
)(Overlay);