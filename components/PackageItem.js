import React, { PropTypes, Component, findDOMNode } from 'react';
import _ from 'lodash';
import marked from 'marked';
import moment from 'moment';
import { Line } from 'react-chartjs';

import DownloadBox from './DownloadBox';
import DownloadChart from './DownloadChart';

require('../css/package-item.scss');

export default class PackageItem extends Component {

  constructor(props) {
    super(props);

    this.closePackage = this.closePackage.bind(this);
    this.selectInstall = this.selectInstall.bind(this);
  }

  render () {
    const { item } = this.props;

    const readme = _.get(item, 'readme') || '';
    const rawMarkup = marked(readme.toString(), {sanitize: true});

    return (      
      <div className='package-item' onClick={this.closePackage}>

        <h1 className='title'>
          {item.name}
          <a className='repo' href={item.repository}>
            <i className='fa fa-github' />
            {_.get(item, 'github.full_name')}
          </a>
        </h1>

        <div className='install'>
          <input
            ref='install'
            type='text'
            value={'npm install '+item.id+' --save'}
            readOnly={true}
            onClick={this.selectInstall}
          />
        </div>

        <p className='desc'>
          {item.description}
        </p>

        <div className='downloads background'>
          <DownloadBox
            name='Downloads'
            value={_.get(item, 'downloads.daily_total')}
          />

          <DownloadBox
            name='Stars'
            value={_.get(item, 'github.stargazers_count')}
          />

          <DownloadBox
            name='Forks'
            value={_.get(item, 'github.forks_count')}
          />

          <DownloadBox
            name='Watchers'
            value={_.get(item, 'github.watchers_count')}
          />
        </div>

        <div className='chart'>
          <DownloadChart
            daily={_.get(item, 'downloads.daily')}
          />
        </div>


        <div className='readme'>
          <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
        </div>
      </div>
    );
  }

  closePackage () {
    const { item, onClose } = this.props;
    if (onClose) onClose(item.id);
  }

  selectInstall (event) {
    event.preventDefault();
    findDOMNode(this.refs['install']).select();
  }
}

PackageItem.propTypes = {
  item: PropTypes.object,
  onClose: PropTypes.func,
};
