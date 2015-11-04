import './company-list-header.less';
import 'lodash';
import React from 'react/addons';
import Button from '../../atoms/button/button.jsx';
const CompanyListHeader = React.createClass({

  propTypes: {
    sortableProps: React.PropTypes.arrayOf(React.PropTypes.string)
  },

  handleSort: function(p) {
    // TODO:
    // - Flip button class
    // - Sort stuff
  },

  render: function() {
    let headerButtons = this.props.sortableProps.map((p, i) => {
      return (
        <Button
          className='sortListButton'
          key={i}
          action={this.handleSort(p)}
          text={p} />
      );
    });

    return (
      <div>{headerButtons}</div>
    );
  }
});

export default CompanyListHeader;
