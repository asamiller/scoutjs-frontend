import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import ChartistGraph from 'react-chartist';

require('../node_modules/chartist/dist/chartist.min.css');
require('../css/charts.scss');

export default class DownloadChart extends Component {

  render () {
    const { daily } = this.props;
    if (!daily || !daily.length) return null;

    let chartData = {
      labels: daily.map((day)=>moment(day.date).format('MMM D')),
      series: [daily.map((day)=>day.count)]
    };

    let chartOptions = {
      colors:["#333", "#222", "#111", "#000"],
      axisX: {
        labelInterpolationFnc: (value, index) => index % 2 === 0 ? value : null,
        showLabel: true,
        showGrid: false,
      },
      axisY: {
        showLabel: false,
        showGrid: false,
      },
      showArea: true,
      showLine: false,
      showPoint: false,
      fullWidth: true,
      height: '300px',
    };

    return (
      <ChartistGraph
        data={chartData}
        options={chartOptions}
        type={'Line'}
      />
    );
  }
}

DownloadChart.propTypes = {
  daily: PropTypes.array,
};
