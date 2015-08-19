import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import Color from 'color';
import DownloadBox from './DownloadBox.js';

require('../css/search-results-item.scss');

export default class SearchResultItem extends Component {

  constructor(props) {
    super(props);

    this.selectPackage = this.selectPackage.bind(this);
  }

  render () {
    const { item, maxRank } = this.props;

    let rank = item.rank / maxRank;

    let color;

    let color1 = Color('#f04e51');
    let color2 = Color('#c0b861');
    let color3 = Color('#218791');

    if (rank > 0.5) {
      color = color1.mix(color2, rank);
    }
    else {
      color = color2.mix(color3, rank);
    }

    let style = {
      backgroundColor: color.hexString(),
    };

    return (
      <div className='search-results-item' onClick={this.selectPackage}>
        <h1 className='title' style={style}>
          {item.name}
        </h1>

        <div className='content'>

          <p className='desc'>
            {item.description}
          </p>

          <div className='downloads'>
            <DownloadBox
              name='Downloads'
              value={item.downloads}
              color={color.hexString()}
            />

            <DownloadBox
              name='Stars'
              value={item.stars}
              color={color.hexString()}
            />
          </div>
        </div>

      </div>
    );
  }

  selectPackage () {
    const { item, onSelect } = this.props;
    if (onSelect) onSelect(item.id);
  }
}

SearchResultItem.propTypes = {
  item: PropTypes.object,
  maxRank: PropTypes.number,
  onSelect: PropTypes.func,
};
