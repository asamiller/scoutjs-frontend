import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchSearchIfNeeded } from '../actions';
import LogoBar from '../components/LogoBar';
import SearchBox from '../components/SearchBox';
import SearchResults from '../components/SearchResults';

require('../css/app.scss');

class NPFApp extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    const { dispatch, search } = this.props;
    dispatch(fetchSearchIfNeeded(search));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.search !== this.props.search) {
      const { dispatch, search } = nextProps;
      dispatch(fetchSearchIfNeeded(search));
    }
  }

  render () {
    const { search, packages, isFetching, lastUpdated } = this.props;
    return (
      <div>
        <LogoBar />
        <SearchBox onSearch={this.handleSearch} search={search} />
        <SearchResults packages={packages} />
      </div>
    );
  }

  handleSearch (term) {
    const { dispatch } = this.props;

    dispatch(fetchSearchIfNeeded({ term }));
  }
}

NPFApp.propTypes = {
  search: PropTypes.object.isRequired,
  packages: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { search, searchResults } = state;

  let resultsForSearch = searchResults[search.term] || {
    isFetching: true,
    items: []
  };

  const {
    isFetching,
    lastUpdated,
    items,
  } = resultsForSearch;

  return {
    search,
    packages: items,
    isFetching,
    lastUpdated,
  };
}

export default connect(mapStateToProps)(NPFApp);
