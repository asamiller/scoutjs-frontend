import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import Humanize from 'humanize-plus';
import semver from 'semver';

import PackageDivider from './PackageDivider';
import ChartItem from './ChartItem';

require('../../node_modules/chartist/dist/chartist.min.css');
import '../../assets/stylesheets/charts.scss';

export default class ReleaseChart extends Component {

  render () {
    const { releases } = this.props;
    if (!releases || !releases.length) return null;

    const keys = releases.map((release)=>moment(release.date).format('MMMM YYYY'));
    const firstVersion = this.getVersionNumber(_.first(releases));
    const lastVersion = this.getVersionNumber(_.last(releases));

    return (
      <div className='chart'>
        <PackageDivider text='Releases' />
        <div className='chart-block'>
          {_.map(releases, (release, index)=>(
            <ChartItem
              item={this.calculateChartNumber(release, firstVersion, lastVersion)}
              label={release.version}
              key={index}
            />
          ))}
        </div>
      </div>
    );
  }

  calculateChartNumber (current, min, max) {
    const currentVersion = this.getVersionNumber(current);

    const percentages = {
      date: this.percentAlongRange(currentVersion.date, min.date, max.date),
      major: this.percentAlongRange(currentVersion.major, 0, max.major),
      minor: this.percentAlongRange(currentVersion.minor, 0, max.minor),
      patch: this.percentAlongRange(currentVersion.patch, 0, max.patch),
    };

    return {
      date: percentages.date,
      value: (percentages.major + percentages.minor + percentages.patch) / 3,
    }
  }

  getVersionNumber (release) {
    return {
      date: new Date(release.date).getTime(),
      major: semver.major(release.version) || 0,
      minor: semver.minor(release.version) || 0,
      patch: semver.patch(release.version) || 0,
    };
  }

  percentAlongRange (x, a, b) {
    return (x-a) / (b-a);
  }
}

ReleaseChart.propTypes = {
  releases: PropTypes.array,
};
