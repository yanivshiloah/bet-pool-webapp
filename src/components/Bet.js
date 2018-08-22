import React, {Component} from 'react';
import styles from './../css/Bet';
import Team from './Team';

export default class Bet extends Component {
  render() {
    const {bet} = this.props;
    return (
      <div className={styles.betContainer}>
        <Team team={bet.challenge.game.team1} />
        <Team team={bet.challenge.game.team2} />
      </div>
    );
  }
}

Bet.propTypes = {};

Bet.defaultProps = {};
