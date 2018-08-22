import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import styles from './../css/Pool';
import Bet from './Bet';

class Pool extends Component {
  render() {
    return (
      <div className={styles.betsContainer}>
        <div>
          {_.map(this.props.bets, bet => <Bet bet={bet} />)}
        </div>
      </div>
    );
  }
}

const mapState = state => {
  const {poolId} = state.location.payload;
  return {
    bets: state.data.bets[poolId]
  };
};

export default connect(mapState)(Pool);

Pool.propTypes = {};
Pool.defaultProps = {};
