import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchSearch } from '../actions/search';
import { viewPackage, closePackage } from '../actions/packages';
import Search from '../components/Search';
import Packages from '../components/Packages';

import '../../assets/stylesheets/app.scss';

class NPFApp extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.handlePackageOpen = this.handlePackageOpen.bind(this);
    this.handlePackageClose = this.handlePackageClose.bind(this);
  }

  componentDidMount() {
    const { dispatch, search } = this.props;
    dispatch(fetchSearch(search));
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.search !== this.props.search) {
  //     const { dispatch, search } = nextProps;
  //     dispatch(fetchSearch(search));
  //   }
  // }

  render () {
    const { search, searchResults, selectedPackages } = this.props;
    const isPackageOpen = !!selectedPackages.length;

    return (
      <div className='app'>
        <Search
          search={search}
          searchResults={searchResults}
          onSearch={this.handleSearch}
          onPackageOpen={this.handlePackageOpen}
          isPackageOpen={isPackageOpen}
        />

        <Packages
          visible={isPackageOpen}
          selectedPackages={selectedPackages}
          onClose={this.handlePackageClose}
        />
      </div>
    );
  }

  handleSearch (term, next) {
    const { dispatch } = this.props;
    dispatch(fetchSearch({ term, next }));
  }

  handlePackageOpen (id) {
    const { dispatch } = this.props;
    dispatch(viewPackage(id));
  }

  handlePackageClose (id) {
    const { dispatch } = this.props;
    dispatch(closePackage(id));
  }
}

NPFApp.propTypes = {
  search: PropTypes.object.isRequired,
  searchResults: PropTypes.object.isRequired,
  selectedPackages: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { search, searchResults, packages, selectedPackages } = state;

  let singleSearchResult = searchResults[search.term] || {};

  let selectedPackagesData = selectedPackages.map((id, index)=>packages[id]);

  return {
    search,
    searchResults: singleSearchResult,
    selectedPackages: selectedPackagesData,
  };
}

export default connect(mapStateToProps)(NPFApp);
