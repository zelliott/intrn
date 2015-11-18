import './modal.less';

import React from 'react/addons';
import AppActions from '../../../js/actions/app-actions';
import Button from '../../atoms/button/button.jsx';

const Modal = React.createClass({

  propTypes: {
    open: React.PropTypes.bool,
    name: React.PropTypes.string
  },

  getInitialState: function() {
    return ({
      open: this.props.open
    });
  },

  _onKeydown: function(event) {
    if (event.keyCode == 27) {
      this.closeModal();
    }
  },

  componentWillMount: function() {
    document.addEventListener('keydown', this._onKeydown, false);
  },

  componentWillUnmount: function() {
    document.removeEventListener('keydown', this._onKeydown, false);
  },

  componentWillReceiveProps: function(props) {
    this.setState({
      open: props.open
    });
  },

  closeModal: function() {
    this.setState({
      open: false
    });

    AppActions.hideModal(this.props.name);
  },

  render: function() {

    let classes = React.addons.classSet({
      'modal': true,
      'open': this.state.open
    });

    return (
    <div className={classes}>
        <div className='modal-upper'>
          <Button className='close-modal'
            action={this.closeModal}
            icon='close' />
        </div>
        {this.props.children}
      </div>
    );
  }
});

export default Modal;
