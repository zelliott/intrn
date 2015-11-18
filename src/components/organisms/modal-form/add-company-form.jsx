import './modal-form.less';
import React from 'react/addons';
import AppActions from '../../../js/actions/app-actions';
import AddCompanyStore from '../../../js/stores/add-company-store';
import InputText from '../../atoms/input-text/input-text.jsx'
import InputNumber from '../../atoms/input-number/input-number.jsx'
import Button from '../../atoms/button/button.jsx'

const AddCompanyForm = React.createClass({

  getInitialState: function() {
    return ({
      name: '',
      salary: '',
      funness: '',
      perks: '',
      difficulty: '',
      nameFocus: true,
      companyNames: AddCompanyStore.getCompanyNames()
    });
  },

  validate: function(data) {
    let validName = this.state.companyNames.length === 1;
    let valid = true;
    let errors = [];
    let errorMessages = {
      name: 'Must be a valid company name',
      salary: 'Must be a number greater than 0',
      funness: 'Must be in the range 0 to 100',
      perks: 'Must be in the range 0 to 100',
      difficulty: 'Must be in the range 0 to 100'
    };
    let validate = {
      name: value => {
        return _.contains(this.state.companyNames, value);
      },
      salary: value => {
        if (value === '') {
          return true;
        } else {
          value = parseInt(value, 10);
          return _.isNumber(value) && _.inRange(value, 0, Infinity);
        }
      },
      funness: value => {
        if (value === '') {
          return true;
        } else {
          value = parseInt(value, 10);
          return _.isNumber(value) && _.inRange(value, 0, 101);
        }
      },
      perks: value => {
        if (value === '') {
          return true;
        } else {
          value = parseInt(value, 10);
          return _.isNumber(value) && _.inRange(value, 0, 101);
        }
      },
      difficulty: value => {
        if (value === '') {
          return true;
        } else {
          value = parseInt(value, 10);
          return _.isNumber(value) && _.inRange(value, 0, 101);
        }
      }
    };

    _.each(_.keys(data), key => {
      let datum = data[key];
      let validData = validate[key](datum, 10);

      // if (!validData) {
      //   errors.push({
      //     field: key,
      //     message: errorMessages[key]
      //   });
      // }

      valid = valid && validData;
    });



    return valid;
  },

  _searchCompanyNames: function(search) {
    AppActions.searchCompanyNames(search)

    this.setState({
      companyNames: AddCompanyStore.getCompanyNames()
    });
  },

  _onBlur: function() {
    this.setState({
      nameFocus: false
    });
  },

  _onFocus: function() {
    this.setState({
      nameFocus: true
    });
  },

  _onChange: function(event) {
    this.setState({
      [event.target.name]: event.target.value
    });

    if (event.target.name === 'name') {
      this._searchCompanyNames(event.target.value);
    }
  },

  _autoFill: function(name) {
    this.setState({
      name: name
    });
  },

  _onSubmit: function() {
    event.preventDefault();

    let data = {
      name: this.state.name,
      salary: this.state.salary,
      funness: this.state.funness,
      perks: this.state.perks,
      difficulty: this.state.difficulty
    };

    if (this.validate(data)) {
      AppActions.addCompany(data);

      this.setState({
        name: '',
        salary: '',
        funness: '',
        perks: '',
        difficulty: ''
      });

      AppActions.hideModal('add_company');
    }
  },

  componentDidMount: function() {
    AppActions.loadCompanyNames();
  },

  componentDidUpdate: function() {
    if (this.state.nameFocus) {
      React.findDOMNode(this.refs.name).focus();
    }
  },

  render: function() {
    let dropdownShow = this.state.nameFocus && (this.state.companyNames.length !== 0);
    let companyNames = _.map(this.state.companyNames, name => {
      return (
        <Button
          text={name}
          onMouseDown={this._autoFill.bind(this, name)} />
      );
    });

    return (
      <div className='modal-form'>
        <div className='form-header'>Add internship feedback</div>
        <form onSubmit={this._onSubmit}>
          <div className='form-block'>
            <div className='block-header'>Company name</div>
            <InputText
              name={'name'}
              ref={'name'}
              value={this.state.name}
              placeholder={'Begin typing to find companies'}
              onChange={this._onChange}
              onBlur={this._onBlur}
              onFocus={this._onFocus} />

            <div className={dropdownShow ? 'input-dropdown' : 'input-dropdown dropdown-hide'}>
              {companyNames}
            </div>

          </div>
          <div className='form-inline-block'>
            <div className='block-header'>Salary</div>
            <InputNumber
              name={'salary'}
              ref={'salary'}
              value={this.state.salary}
              placeholder={''}
              onChange={this._onChange} />
          </div>
          <div className='form-inline-block'>
            <div className='block-header'>Funness</div>
            <InputNumber
              name={'funness'}
              ref={'funness'}
              value={this.state.funness}
              placeholder={'0 - 100'}
              onChange={this._onChange} />
          </div>
          <div className='form-inline-block'>
            <div className='block-header'>Perks</div>
            <InputNumber
              name={'perks'}
              ref={'perks'}
              value={this.state.perks}
              placeholder={'0 - 100'}
              onChange={this._onChange} />
          </div>
          <div className='form-inline-block'>
            <div className='block-header'>Difficulty</div>
            <InputNumber
              name={'difficulty'}
              ref={'difficulty'}
              value={this.state.difficulty}
              placeholder={'0 - 100'}
              onChange={this._onChange} />
          </div>
          <Button
            name='addCompany'
            text='Add feedback'
            icon='add' />
        </form>
      </div>
    );
  }
});

export default AddCompanyForm;
