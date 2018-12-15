import React, {Component} from 'react';
import {connect} from 'react-redux';
import {boundClass} from 'autobind-decorator';
import Error from './Error';
import Switcher from './Switcher';
import {logout} from '../actions';
import styles from '../css/App';

const mapState = ({
 auth, page, direction, error, location
}) => ({
  page,
  auth,
  direction,
  error,
  isProtected: (location.routesMap[location.type] || {}).protected
});

@boundClass
@connect(mapState)
export default class App extends Component {
  logout() {
    this.props.dispatch(logout());
  }

  render() {
    const {error} = this.props;
    if (error.size) {
      return <Error />;
    }
    return (
      <div className={styles.appContainer}>
        <Switcher />
      </div>
    );
  }
}
