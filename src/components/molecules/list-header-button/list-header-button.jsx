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
    text: React.PropTypes.string,
    active: React.PropTypes.bool,
    property: React.PropTypes.string,
    comparator: React.PropTypes.bool
  },

  handleClick: function() {
    let active = this.props.active;
    let comparator = active ? ! this.props.comparator : true;
    let property = this.props.property;

    this.props.action.call(this, property, comparator);
  },

  render: function() {
    let active = this.props.active;
    let classes = React.addons.classSet({
      [this.props.className]: true,
      active: active,
      asc: active && this.props.comparator,
      desc: active && !this.props.comparator
    });

    return(
      <button
        className={classes}
        onClick={this.handleClick}>
        {this.props.text}
        <i className='material-icons down'>arrow_drop_down</i>
        <i className='material-icons up'>arrow_drop_up</i>
      </button>
    );
  }
});

export default ListHeaderButton;
