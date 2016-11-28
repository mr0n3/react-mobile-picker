import React, {Component, PropTypes} from 'react';
import Picker from 'react-mobile-picker';

export default class NamePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueGroups: {
        title: {value: 'Mr.'},
        firstName: {value: 'Micheal'},
        secondName: {value: 'Jordan'}
      }, 
      optionGroups: {
        title: [{value: 'Mr.'}, {value: 'Mrs.'}, {value: 'Ms.'}, {value: 'Dr.'}],
        firstName: [{value: 'John'}, {value: 'Micheal'}, {value: 'Elizabeth'}],
        secondName: [{value: 'Lennon'}, {value: 'Jackson'}, {value: 'Jordan'}, {value: 'Legend'}, {value: 'Taylor'}]
      }
    };
  }

  handleChange = (name, value) => {
    this.setState(({valueGroups}) => ({
      valueGroups: {
        ...valueGroups,
        [name]: value
      }
    }));
  };

  render() {
    const {optionGroups, valueGroups} = this.state;

    return (
      <div className="example-container">
        <div className="weui_cells_title">1. As an inline component</div>
        <div className="weui_cells">
          <div className="weui_cell">
            <div className="weui_cell_bd weui_cell_primary">Hi, {valueGroups.title.value} {valueGroups.firstName.value} {valueGroups.secondName.value}</div>
          </div>
        </div>
        <div className="picker-inline-container">
          <Picker
            optionGroups={optionGroups}
            valueGroups={valueGroups}
            labelField="value"
            keyField="value"
            onChange={this.handleChange} />
        </div>
      </div>
    );
  }
}
