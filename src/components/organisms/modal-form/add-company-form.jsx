import './modal-form.less';
import React from 'react/addons';
import AppActions from '../../../js/actions/app-actions';
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
      difficulty: ''
    });
  },

  _onChange: function(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  },

  _onSubmit: function() {
    event.preventDefault();

    AppActions.addCompany({
      name: this.state.name,
      salary: this.state.salary,
      funness: this.state.funness,
      perks: this.state.perks,
      difficulty: this.state.difficulty
    });

    this.setState({
      name: '',
      salary: '',
      funness: '',
      perks: '',
      difficulty: ''
    });

    AppActions.hideModal('add_company');
  },

  render: function() {
    return (
      <div className='modal-form'>
        <div className='form-header'>Add internship feedback</div>
        <form onSubmit={this._onSubmit}>
          <div className='form-block'>
            <div className='block-header'>Company name</div>
            <InputText
              name={'name'}
              value={this.state.name}
              placeholder={'Enter company name here'}
              onChange={this._onChange} />
          </div>
          <div className='form-inline-block'>
            <div className='block-header'>Salary</div>
            <InputNumber
              name={'salary'}
              value={this.state.salary}
              placeholder={''}
              onChange={this._onChange} />
          </div>
          <div className='form-inline-block'>
            <div className='block-header'>Funness</div>
            <InputNumber
              name={'funness'}
              value={this.state.funness}
              placeholder={'0 - 100'}
              onChange={this._onChange} />
          </div>
          <div className='form-inline-block'>
            <div className='block-header'>Perks</div>
            <InputNumber
              name={'perks'}
              value={this.state.perks}
              placeholder={'0 - 100'}
              onChange={this._onChange} />
          </div>
          <div className='form-inline-block'>
            <div className='block-header'>Difficulty</div>
            <InputNumber
              name={'difficulty'}
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
