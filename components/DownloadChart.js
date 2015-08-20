import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import ChartistGraph from 'react-chartist';
import Humanize from 'humanize-plus';

require('../node_modules/chartist/dist/chartist.min.css');
require('../css/charts.scss');

export default class DownloadChart extends Component {

  render () {
    const { daily, monthly } = this.props;
    var data = monthly || daily;
    if (!data || !data.length) return null;

    let format = 'MMM D'
    if (monthly) format = 'MMMM YYYY';

    let chartData = {
      labels: data.map((day)=>moment(day.date).format(format)),
      series: [data.map((day)=>day.count)]
    };

    let chartOptions = {
      colors:["#333", "#222", "#111", "#000"],
      axisX: {
        labelInterpolationFnc: (value, index) => index % Math.round(data.length/6) === 0 ? value : null,
        showLabel: true,
        showGrid: false,
      },
      axisY: {
        labelInterpolationFnc: (value, index) => Humanize.compactInteger(value).toLowerCase(),
        showLabel: true,
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
