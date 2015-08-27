import React, { Component, PropTypes } from 'react';

import '../../assets/stylesheets/logo-bar.scss';
import logo from '../../assets/images/scoutjs.svg';

export default class LogoBar extends Component {
  render () {
    return (
      <div className='logo-bar'>
        <img src={logo} className='logo' alt='ScoutJS' />
        <p className='tag-line'>
          177,815 NPM packages &amp; Github data for your searching pleasure.
        </p>
      </div>
    );
  }
}

LogoBar.propTypes = {
  
};