import React, { PropTypes, Component } from 'react';
import Humanize from 'humanize-plus';

export default class DownloadBox extends Component {

  render () {
    const { name, value, color } = this.props;

    if (!value) return null;

    let style = {
      color: color,
    };

    return (
      <div className='downloads-box'>
        <h3 className='value' style={style}>{Humanize.compactInteger(value, 1).toLowerCase()}</h3>
        <p className='name'>{name}</p>
      </div>
    );
  }
}

DownloadBox.propTypes = {
  name: PropTypes.string,
  value: PropTypes.number,
  color: PropTypes.string,
};
