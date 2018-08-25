import React, {Component} from 'react';
import cx from 'classnames';
import styles from './../css/Team';

export default class Team extends Component {
  render() {
    const {team, closed, score} = this.props;
    const classnames = cx(styles.teamContainer, {
      [styles.teamContainerClosed]: closed
    });
    return (
      <div className={classnames} data-image-src={team.flag}>
        <div
          style={{backgroundImage: `url(${team.flag})`}}
          className={styles.teamFlag}
        />
        <div className={styles.teamScore}>{score}</div>
        <div className={styles.teamName}>{team.name}</div>
      </div>
    );
  }
}

Team.propTypes = {};

Team.defaultProps = {};
