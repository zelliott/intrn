import './list-header-button.less';
import React from 'react/addons';

/**
 * TODO:
 * Might make more sense to use `state` instead of `props` here to
 * manage `active` and `comparator`.
 */
const ListHeaderButton = React.createClass({

  propTypes: {
    className: React.PropTypes.string,
    action: React.PropTypes.func,
    name: React.PropTypes.string,
    displayName: React.PropTypes.string,
    active: React.PropTypes.bool,
    direction: React.PropTypes.bool
  },

  _onClick: function() {
    let direction = this.props.active ? !this.props.direction : true;
    this.props.action.call(this, this.props.name, direction);
  },

  render: function() {
    let classes = React.addons.classSet({
      [this.props.className]: true,
      active: this.props.active,
      asc: this.props.active && this.props.direction,
      desc: this.props.active && !this.props.direction
    });

    return (

      <button
        className={classes}
        onClick={this._onClick}>
        {this.props.displayName}
        <i className='material-icons down'>arrow_drop_down</i>
        <i className='material-icons up'>arrow_drop_up</i>
      </button>
    );
  }
});

export default ListHeaderButton;
