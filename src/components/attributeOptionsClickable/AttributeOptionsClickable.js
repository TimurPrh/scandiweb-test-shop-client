import React, { Component } from 'react';
import './attribute-options-clickable.scss'

class AttributeOptionsClickable extends Component {
  render() {
    const getOptionClass = (availableOption, type) => {
      let classList = 'attribute-options-clickable__item'
      if (availableOption.id === this.props.selectedOption.valueId) {
        classList += ' attribute-options-clickable__item_selected'
      }
      if (type === 'swatch') {
        classList += ' attribute-options-clickable__item_type_swatch'
        if (availableOption.value === '#FFFFFF') {
          classList += ' attribute-options-clickable__item_with-black-border'
        }
      }
      return classList
    }

    const getOptionsList = () => {
      if (this.props.availableOptions.type === 'text') {
        return (
          <>
            {this.props.availableOptions.items.map(availableOption => (
              <button 
                className={getOptionClass(availableOption, this.props.selectedOption.type)} 
                key={availableOption.id}
                onClick={() => this.props.changeSelectedOption({
                  ...availableOption, 
                  valueId: availableOption.id,
                  id: this.props.availableOptions.id,
                  name: this.props.availableOptions.name,
                  type: this.props.availableOptions.type,
                })}
                >
                {availableOption.value}
              </button>
            ))}
          </>
        )
      } else if (this.props.availableOptions.type === 'swatch') {
        return (
          <>
            {this.props.availableOptions.items.map(availableOption => (
              <button 
                className={getOptionClass(availableOption, this.props.selectedOption.type)} 
                key={availableOption.id} 
                style={{backgroundColor: availableOption.value, borderColor: availableOption.value,}}
                onClick={() => this.props.changeSelectedOption({
                  ...availableOption, 
                  valueId: availableOption.id,
                  id: this.props.availableOptions.id,
                  name: this.props.availableOptions.name,
                  type: this.props.availableOptions.type,
                })}
                >
              </button>
            ))}
          </>
        )
      }
    }
    
    return (
      <div className='attribute-options-clickable'>
        {getOptionsList()}
      </div>
    );
  }
}

export default AttributeOptionsClickable;