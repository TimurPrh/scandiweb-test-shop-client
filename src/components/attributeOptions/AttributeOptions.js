import React, { Component } from 'react';
import './attribute-options.scss'

class AttributeOptions extends Component {
  render() {
    const getOptionClass = (availableOption, type) => {
      let classList = 'attribute-options__item'
      if (availableOption.id === this.props.selectedOptions.valueId) {
        classList += ' attribute-options__item_selected'
      }
      if (type === 'swatch') {
        classList += ' attribute-options__item_type_swatch'
        if (availableOption.value === '#FFFFFF') {
          classList += ' attribute-options__item_with-black-border'
        }
      }
      return classList
    }

    const getOptionsList = () => {
      if (this.props.selectedOptions.type === 'text') {
        return (
          <>
            {this.props.availableOptions.items.map(availableOption => (
              <div 
                className={getOptionClass(availableOption, this.props.selectedOptions.type)} 
                key={availableOption.id + this.props.type}
                >
                {availableOption.value}
              </div>
            ))}
          </>
        )
      } else if (this.props.selectedOptions.type === 'swatch') {
        return (
          <>
            {this.props.availableOptions.items.map(availableOption => (
              <div 
                className={getOptionClass(availableOption, this.props.selectedOptions.type)} 
                key={availableOption.id + this.props.type} 
                style={{backgroundColor: availableOption.value, borderColor: availableOption.value}}
                >
              </div>
            ))}
          </>
        )
      }
    }

    return (
      <div className={this.props.type === "big" ? 'attribute-options attribute-options_big' : 'attribute-options'}>
        {getOptionsList()}
      </div>
    );
  }
}

export default AttributeOptions;