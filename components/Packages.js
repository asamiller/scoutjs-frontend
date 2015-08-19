import React, { PropTypes, Component } from 'react';
import PackageItem from './PackageItem.js';

require('../css/packages.scss');

export default class Packages extends Component {

  render () {
    const { selectedPackages, onClose, width } = this.props;

    if (!selectedPackages.length) return null;

    var style = {
      width: width + '%',
    };

    return (
      <div className='packages' style={style}>
        {_.map(selectedPackages, (item, index) =>
          <PackageItem
            key={item.id}
            item={item.data}
            onClose={onClose}
          />
        )}
      </div>
    );
  }
}

Packages.propTypes = {
  selectedPackages: PropTypes.array.isRequired,
  onClose: PropTypes.func,
  width: PropTypes.number,
};
