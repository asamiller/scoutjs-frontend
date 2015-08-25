import React from 'react';

export default class PackageDivider extends React.Component {

  render() {
    const { text } = this.props;
    return (
      <div className='package-divider'>
        <span>{text}</span>
      </div>
    );
  }

}

PackageDivider.propTypes = {
  text: React.PropTypes.string,
};