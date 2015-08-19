import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import SearchResultItem from './SearchResultItem.js';

require('../css/search-results.scss');

export default class SearchResults extends Component {

  constructor(props) {
    super(props);

    // this.handleChange = this.handleChange.bind(this);
  }

  render () {
    const { packages } = this.props;

    let maxRank = _.max(_.map(packages, (item)=>item.rank));

    return (
      <div className='search-results'>
        {_.map(packages, (item, index) =>
          <SearchResultItem
            key={index}
            item={item}
            maxRank={maxRank}
          />
        )}
      </div>
    );
  }
}

SearchResults.propTypes = {
  packages: PropTypes.object,
};
