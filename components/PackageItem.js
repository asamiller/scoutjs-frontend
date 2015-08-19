import React, { PropTypes, Component, findDOMNode } from 'react';
import _ from 'lodash';
import marked from 'marked';

require('../css/package-item.scss');

export default class PackageItem extends Component {

  constructor(props) {
    super(props);

    this.closePackage = this.closePackage.bind(this);
    this.selectInstall = this.selectInstall.bind(this);
  }

  render () {
    const { item } = this.props;

    var readme = _.get(item, 'readme') || '';
    var rawMarkup = marked(readme.toString(), {sanitize: true});

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
            readonly={true}
            onClick={this.selectInstall}
          />
        </div>
        <p className='desc'>
          {item.description}
        </p>
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
