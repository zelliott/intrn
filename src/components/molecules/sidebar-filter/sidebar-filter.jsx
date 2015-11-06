import './sidebar-filter.less';
import InputText from '../../atoms/input-text/input-text.jsx';
import React from 'react/addons';

const SidebarFilter = React.createClass({

  propTypes: {
    action: React.PropTypes.func,
    property: React.PropTypes.string,
    filter: React.PropTypes.object
  },

  getInitialState: function() {
    return ({
      min: this.props.filter.min,
      max: this.props.filter.max
    });
  },

  _onMinChange: function(event) {
    let updatedFilter = {
      type: this.props.filter.type,
      min: event.target.value,
      max: this.state.max
    };

    this.setState({
      min: event.target.value
    });

    this.props.action.call(this, this.props.property, updatedFilter);
  },

  _onMaxChange: function(event) {
    let updatedFilter = {
      type: this.props.filter.type,
      min: this.state.min,
      max: event.target.value
    };

    this.setState({
      max: event.target.value
    });

    this.props.action.call(this, this.props.property, updatedFilter);
  },

  render: function() {

    return (
      <div>
        <div>{this.props.property}</div>
        <InputText
          value={this.state.min}
          onChange={this._onMinChange} />
        <InputText
          value={this.state.max}
          onChange={this._onMaxChange} />
      </div>
    );
  }
});

export default SidebarFilter;
