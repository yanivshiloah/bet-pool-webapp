import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from '../css/TeamBet';
import Team from './Team';

export default class TeamBet extends Component {
  render() {
    const {
 right, team, score, closed
} = this.props;
    const input = (
      <div className={styles.teamBetInputWrapper}>
        <input className={styles.teamBetInput} type="text" />
      </div>
    );
    return (
      <div className={styles.teamBetContainer}>
        {right && input}
        <Team team={team} score={score} closed={closed} />
        {!right && input}
      </div>
    );
  }
}

TeamBet.propTypes = {};

TeamBet.defaultProps = {};
