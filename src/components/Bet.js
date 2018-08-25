import React, {Component} from 'react';
import cx from 'classnames';
import styles from './../css/Bet';
import Team from './Team';
import TeamBet from './TeamBet';

export default class Bet extends Component {
  render() {
    const {bet} = this.props;
    const classnames = cx(styles.betContainer, {
      [styles.betClosed]: bet.closed
    });
    const playAt = new Date(bet.challenge.game.playAt);
    return (
      <div className={classnames}>
        <TeamBet
          team={bet.challenge.game.team1}
          score={bet.challenge.result.score1}
          closed={bet.closed}
        />
        <div>
          <div>{playAt.toLocaleDateString()}</div>
          <div>{playAt.toLocaleTimeString()}</div>
        </div>
        <TeamBet
          team={bet.challenge.game.team2}
          score={bet.challenge.result.score2}
          closed={bet.closed}
          right
        />
      </div>
    );
  }
}

Bet.propTypes = {};

Bet.defaultProps = {};
