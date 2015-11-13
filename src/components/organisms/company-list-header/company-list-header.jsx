import './company-list-header.less';
import 'lodash';
import React from 'react/addons';
import AppActions from '../../../js/actions/app-actions.js';
import ListHeaderButton from '../../molecules/list-header-button/list-header-button.jsx';

const CompanyListHeader = React.createClass({

  propTypes: {
    sorts: React.PropTypes.object,
  },

  getInitialState: function() {
    return {
      sorts: this.props.sorts
    };
  },

  _onChange: function(name, direction) {
    let updatedSorts = this.state.sorts;

    _.each(updatedSorts, (sort, i) => {
      updatedSorts[i].active = false;
    });

    updatedSorts[name].active = true;
    updatedSorts[name].direction = direction;

    AppActions.setSorts(updatedSorts);

    this.setState({
      sorts: updatedSorts
    });
  },

  render: function() {

    let headerButtons = _.map(this.state.sorts, (sort, i) => {
      let isName = sort.name === 'name';
      let classes = React.addons.classSet({
        'button-section': true,
        'wide-button-section': isName
      });

      return (
        <div className={classes}>
          <ListHeaderButton
            className='header-sort-button'
            key={i}
            active={sort.active}
            name={sort.name}
            direction={sort.direction}
            action={this._onChange}
            displayName={sort.displayName} />
          </div>
      );
    });

    return (
      <div className='list-header'>
        {headerButtons}
      </div>
    );
  }
});

export default CompanyListHeader;
