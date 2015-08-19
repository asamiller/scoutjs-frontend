import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Spring } from 'react-motion';

import { fetchSearch } from '../actions/search';
import { viewPackage } from '../actions/packages';
import LogoBar from '../components/LogoBar';
import Search from '../components/Search';
import Packages from '../components/Packages';

require('../css/app.scss');

class NPFApp extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.handlePackageOpen = this.handlePackageOpen.bind(this);
  }

  componentDidMount() {
    const { dispatch, search } = this.props;
    dispatch(fetchSearch(search));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.search !== this.props.search) {
      const { dispatch, search } = nextProps;
      dispatch(fetchSearch(search));
    }
  }

  render () {
    const { search, searchResults, selectedPackages } = this.props;

    var arePackagesShown = !!selectedPackages.length;
    return (
      <div className='app'>
        <LogoBar />
        <Spring endValue={arePackagesShown ? 50 : 0}>
          {val =>
            <div className='content'>
              <Search
                search={search}
                searchResults={searchResults}
                onSearch={this.handleSearch}
                onPackageOpen={this.handlePackageOpen}
                width={val}
              />
              <Packages
                selectedPackages={selectedPackages}
                width={val}
              />
            </div>
          }
        </Spring>

        
      </div>
    );
  }

  handleSearch (term) {
    const { dispatch } = this.props;
    dispatch(fetchSearch({ term }));
  }

  handlePackageOpen (id) {
    const { dispatch } = this.props;
    dispatch(viewPackage(id));
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

  let singleSearchResult = searchResults[search.term] || {
    isFetching: true,
    items: []
  };

  let selectedPackagesData = selectedPackages.map((id, index)=>packages[id]);

  return {
    search,
    searchResults: singleSearchResult,
    selectedPackages: selectedPackagesData,
  };
}

export default connect(mapStateToProps)(NPFApp);
