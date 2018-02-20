import React, { Component } from 'react';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    }
  }

  renderOptions = options => {
    return options.map(option => {
      if (option === 'disabled') {
        return (
          <option
            key={option}
            value=""
            // disabled
            // selected
          >
            Choose from a list
          </option>
        )
      }
      return (
        <option
          key={option}
          value={option}
        >
          {option}
        </option>
      )
    });
  };

  handleChange = e => {
    // console.log('target value', e.target.value);
    this.setState({ value: e.target.value })
  };

  render(){
    const {
      label,
      name,
      type = 'text',
      options,
      onChange,
      value,
      required
    } = this.props;

    if (type === 'textarea') {
      return (
        <div className="field">
          <label htmlFor="">
            {label}
            <textarea
              name={name}
              id=""
              cols="30"
              rows="10"
              onChange={onChange}
              value={value}
              required={required}
            />
          </label>
        </div>
      )
    }

    if (type === 'select') {
      return (
        <div className="field">
          <label htmlFor="">
            {label}
            <select
              name={name}
              id=""
              onChange={onChange}
              value={value}
              required={required}
            >
              {this.renderOptions(options)}
            </select>
          </label>
        </div>
      )
    }

    if (type === 'submit') {
      return (
        <div className="field">
          <input
            type="submit"
            className="button"
          />
        </div>
      )
    }

    return (
      <div className="field">
        <label htmlFor="">
          {label}
          <input
            type="text"
            name={name}
            onChange={onChange}
            value={value}
            required={required}
          />
        </label>
      </div>
    )
  }
}

export default Input;
