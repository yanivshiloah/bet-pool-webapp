import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import Link from 'redux-first-router-link';
import styles from './../css/Home.css';

class Home extends Component {
    render() {
        return <div className={styles.poolsContainer}>
            {_.map(this.props.pools, pool => {
                return <Link to={{type: 'POOL', payload: {poolId: pool._id}}}>
                    <div className={styles.poolItem}>{pool.name}</div>
                </Link>;
            })}
        </div>;
    }
}

const mapState = (state, ownProps) => {
    return {
        pools: state.data.pools
    }
}

export default connect(mapState)(Home);

Home.propTypes = {};
Home.defaultProps = {};
