import React, { PropTypes, Component, findDOMNode } from 'react';
import _ from 'lodash';

export default class UserAvatar extends Component {

  render () {
    const { github } = this.props;
    if (!_.get(github, 'owner.id')) return null;

    const user = github.owner || {};

    var style = {
      backgroundImage: `url(${user.avatar_url})`,
    };

    return (
      <a className='user' href={user.html_url}>
        <div className='user-avatar' style={style} />
        {user.login}
      </a>
    );
  }
}

UserAvatar.propTypes = {
  github: PropTypes.object,
};
