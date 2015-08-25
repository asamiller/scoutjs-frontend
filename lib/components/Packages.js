import React, { PropTypes, Component, findDOMNode } from 'react';
import { Spring } from 'react-motion';

import PackageItem from './PackageItem.js';

import '../../assets/stylesheets/packages.scss';

export default class Packages extends Component {

  constructor(props) {
    super(props);
    this.renderSpringContent = this.renderSpringContent.bind(this);
    this.handleResize = this.handleResize.bind(this);

    this.state = { 
      windowWidth: window.innerWidth,
    };
  }

  componentDidMount () {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize);
  }

  render () {
    const { selectedPackages, onClose, visible } = this.props;

    return (
      <Spring endValue={visible ? 1 : 0}>
        {this.renderSpringContent}
      </Spring>
    );
  }

  renderSpringContent (val) {
    const { selectedPackages, onClose, visible } = this.props;
    if (val === 0) return null;

    let amount = ((1-val) * (this.state.windowWidth/2));
    let translate = `translate3d(${amount}px,0,0)`;
    let style = {
      transform: translate,
      WebkitTransform: translate,
      MozTransform: translate,
    };

    return (
      <div className='packages' style={style}>
        {_.map(selectedPackages, (item, index) =>
          <PackageItem
            key={item.id}
            loading={item.isFetching}
            item={item.data}
            onClose={onClose}
          />
        )}
      </div>
    );
  }

  handleResize (e) {
    this.setState({ windowWidth: window.innerWidth });
  }
}

Packages.propTypes = {
  selectedPackages: PropTypes.array.isRequired,
  onClose: PropTypes.func,
  visible: PropTypes.bool,
};
