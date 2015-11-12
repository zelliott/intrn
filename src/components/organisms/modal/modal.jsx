import './modal.less';

import React from 'react/addons';
import AppActions from '../../../js/actions/app-actions';
import Button from '../../atoms/button/button.jsx';

const Modal = React.createClass({

  getInitialState: function() {
    return ({
      open: false
    });
  },

  toggleModal: function() {
    this.setState({
      open: !this.state.open
    });

    // AppActions call
  },

  render: function() {

    let modalStyle = {
      display: this.state.open ? 'show' : 'none'
    };

    return (
      <div className='modal' style={modalStyle}>
        <Button className='close-modal'
          action={this.toggleModal}
          icon='close' />
      </div>
    );
  }
});

export default Modal;
