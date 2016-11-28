import React, {Component, PropTypes} from 'react';
import Picker from 'react-mobile-picker';

function generateNumberArray(begin, end) {
  let array = [];
  for (let i = begin; i <= end; i++) {
    array.push({value: (i < 10 ? '0' : '') + i  });
  }
  return array;
}

export default class BirthPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPickerShow: false,
      valueGroups: {
        year: {value: '1989'},
        month: {value: '08'},
        day: {value: '12'}
      },
      optionGroups: {
        year: generateNumberArray(1970, 2015),
        month: generateNumberArray(1, 12),
        day: generateNumberArray(1, 31)
      }
    };
  }

  handleChange = (name, selected) => {
    this.setState(({valueGroups, optionGroups}) => {
      const nextState = {
        valueGroups: {
          ...valueGroups,
          [name]: selected
        }
      };
      if (name === 'year' && valueGroups.month.value === '02') {
        if (parseInt(selected) % 4 === 0) {
          nextState.optionGroups = {
            ...optionGroups,
            day: generateNumberArray(1, 29)
          };
        } else {
          nextState.optionGroups = {
            ...optionGroups,
            day: generateNumberArray(1, 28)
          };
        }
      } else if (name === 'month') {
        if (selected === '02') {
          nextState.optionGroups = {
            ...optionGroups,
            day: generateNumberArray(1, 28)
          };
        } else if (['01', '03', '05', '07', '08', '10', '12'].indexOf(selected.value) > -1 &&
          ['01', '03', '05', '07', '08', '10', '12'].indexOf(valueGroups.month) < 0) {
          nextState.optionGroups = {
            ...optionGroups,
            day: generateNumberArray(1, 31)
          };
        } else if (['01', '03', '05', '07', '08', '10', '12'].indexOf(selected.value) < 0 &&
          ['01', '03', '05', '07', '08', '10', '12'].indexOf(valueGroups.month) > -1) {
          nextState.optionGroups = {
            ...optionGroups,
            day: generateNumberArray(1, 30)
          };
        }
      }
      return nextState;
    });
  };

  togglePicker = () => {
    this.setState(({isPickerShow}) => ({
      isPickerShow: !isPickerShow
    }));
  };

  render() {
    const {isPickerShow, optionGroups, valueGroups} = this.state;
    const maskStyle = {
      display: isPickerShow ? 'block' : 'none'
    };
    const pickerModalClass = `picker-modal${isPickerShow ? ' picker-modal-toggle' : ''}`;

    return (
      <div className="example-container">
        <div className="weui_cells_title">2. As a modal and bind to input field</div>
        <div className="weui_cells">
          <div className="weui_cell weui_cell_select weui_select_after">
            <div className="weui_cell_hd">Birthdate</div>
            <div className="weui_cell_bd weui_cell_primary">
              <input
                type="text"
                className="weui_select"
                value={valueGroups.year.value + '/' + valueGroups.month.value + '/' + valueGroups.day.value}
                readOnly
                onClick={this.togglePicker} />
            </div>
          </div>
        </div>
        <div className="picker-modal-container">
          <div className="picker-modal-mask" style={maskStyle} onClick={this.togglePicker}></div>
          <div className={pickerModalClass}>
            <header>
              <div className="title">Choose your birthdate</div>
              <a href="javascript:;" onClick={this.togglePicker}>OK</a>
            </header>
            <Picker
             optionGroups={optionGroups}
             valueGroups={valueGroups}
             keyField="value"
             labelField="value"
             onChange={this.handleChange} />
          </div>
        </div>
      </div>
    );
  }
}
