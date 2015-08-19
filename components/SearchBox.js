import React, { PropTypes, Component } from 'react';
import _ from 'lodash';

require('../css/search-box.scss');

export default class SearchBox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: _.get(props, 'search.term') || '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render () {
    const search = this.props.search || {};

    return (
      <div className='search-box'>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            value={this.state.value}
            onChange={this.handleChange}
            className='search-box-input'
          />
        </form>
      </div>
    );
  }

  handleChange (event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit (event) {
    event.preventDefault();
    if (this.props.onSearch) this.props.onSearch(this.state.value);
  }
}

SearchBox.propTypes = {
  search: PropTypes.object,
  onSearch: PropTypes.func,
};
