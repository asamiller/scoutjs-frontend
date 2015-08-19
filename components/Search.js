import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import SearchBox from '../components/SearchBox';
import SearchResults from '../components/SearchResults';

export default class Search extends Component {

  render () {
    const { search, searchResults, onSearch, onPackageOpen, width } = this.props;

    var style = {
      width: (100 - width) + '%',
    };

    return (
      <div className='search' style={style}>
        <SearchBox
          onSearch={onSearch}
          search={search}
        />
        <SearchResults
          searchResults={searchResults}
          onPackageOpen={onPackageOpen}
        />
      </div>
    );
  }
}

Search.propTypes = {
  search: PropTypes.object,
  searchResults: PropTypes.object,
  onSearch: PropTypes.func,
  onPackageOpen: PropTypes.func,
  width: PropTypes.number,
};