import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {connect} from 'react-redux';
import styles from './../css/Pool.css';

class Pool extends Component {
    render() {
        return <div className={styles.betsContainer}>
            <div>
                {_.map(this.props.bets, bet => {
                    return <div>bet</div>;
                })}
            </div>
        </div>
    }
}


const mapState = (state, ownProps) => {
    const {poolId} = state.location.payload;
    return {
        bets: state.data.bets[poolId]
    };
}

export default connect(mapState)(Pool);


Pool.propTypes = {};
Pool.defaultProps = {};