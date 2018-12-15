import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import Ink from 'react-ink';
import {colonFormatter} from '../formatters';
import textProvider from '../texts';
import styles from './../css/Home';

export default class SinglePoolItem extends Component {
  render() {
    const {pool} = this.props;
    return (
      <div className={styles.pool}>
        <Ink />
        <div className={styles.poolBody}>
          <div className={styles.poolSide}>
            <img
              alt="presentation"
              className={styles.poolImage}
              src={pool.image}
            />
          </div>
          <div className={styles.poolMain}>
            <div>
              <div className={styles.poolTitle}>{pool.name}</div>
              <div className={styles.poolBuyIn}>
                <span>{pool.buyIn}&#8362;</span>
                <div className={styles.poolLastCheckIn}>
                  <span>
                    {colonFormatter(textProvider.getPoolsText('deadline'))}
                  </span>
                  <span>
                    {moment(pool.lastCheckIn).format('DD/MM/YY hh:mm')}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.poolPlayers}>
                <span>
                  {colonFormatter(textProvider.getPoolsText('players'))}
                </span>
                <span>{_.size(pool.participates)}</span>
              </div>
              <div className={styles.poolPot}>
                <span>{colonFormatter(textProvider.getPoolsText('pot'))}</span>
                <span>{pool.pot}&#8362;</span>
              </div>
              <div className={styles.poolFirstPlace}>
                <span>
                  {colonFormatter(textProvider.getPoolsText('firstPrize'))}
                </span>
                <span>{_.first(pool.prices)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SinglePoolItem.propTypes = {};

SinglePoolItem.defaultProps = {};
