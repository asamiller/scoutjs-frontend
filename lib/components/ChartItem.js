import React, { PropTypes, Component } from 'react';

export default class ChartItem extends Component {

  render () {
    const { item, max, label } = this.props;

    return (
      <div className='chart-item'>
        
      </div>
    );
  }
}

ChartItem.propTypes = {
  item: PropTypes.object,
  max: PropTypes.number,
  label: PropTypes.string,
};
