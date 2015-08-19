import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import SearchResultItem from './SearchResultItem.js';

require('../css/search-results.scss');

export default class SearchResults extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    const { searchResults, onPackageOpen } = this.props;
    var packages = searchResults.items || [];

    let maxRank = _.max(_.map(packages, (item)=>item.rank));

    return (
      <div className='search-results'>
        {_.map(packages, (item, index) =>
          <SearchResultItem
            key={index}
            item={item}
            maxRank={maxRank}
            onSelect={onPackageOpen}
          />
        )}
      </div>
    );
  }
}

SearchResults.propTypes = {
  packages: PropTypes.object,
  onPackageOpen: PropTypes.func,
};
