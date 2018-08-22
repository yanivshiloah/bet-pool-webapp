import React, {Component} from 'react';
import styles from './../css/Team';

export default class Team extends Component {
  render() {
    const {team} = this.props;
    return (
      <div className={styles.teamContainer}>
        <div className={styles.teamImage}>
          <img alt="" width="70" height="40" src={team.flag} />
        </div>
        <div className={styles.teamName}>{team.name}</div>
      </div>
    );
  }
}

Team.propTypes = {};

Team.defaultProps = {};
