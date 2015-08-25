import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import { Spring, presets } from 'react-motion';

import '../../assets/stylesheets/loader.scss';

export default class Loader extends Component {

  constructor(props) {
    super(props);
    this.renderLoaderDiv = this.renderLoaderDiv.bind(this);
  }

  render () {
    return (
      <Spring defaultValue={{val: 0}} endValue={{val: this.props.visible ? 1 : 0, config: presets.wobbly}}>
        {this.renderLoaderDiv}
      </Spring>
    );
  }

  renderLoaderDiv (cur) {
    const { color, visible } = this.props;
    let classes = classNames('loader', color);

    if (cur.val === 0) classes = '';

    let scale = `scale(${cur.val})`;
    let style = {
      transform: scale,
      WebkitTransform: scale,
      MozTransform: scale,
    };

    return (
      <div style={style} className='loader-wrapper'>
        <div
          className={classes}
        />
      </div>
    );
  }
}

Loader.propTypes = {
  visible: PropTypes.bool,
  size: PropTypes.string,
  color: PropTypes.string,
};
