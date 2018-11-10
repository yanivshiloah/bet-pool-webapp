import React from 'react';
import {connect} from 'react-redux';
import {Icon} from 'semantic-ui-react';
import Error from './Error';
import Switcher from './Switcher';
import {logout} from '../actions';
import styles from '../css/App';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.dispatch(logout());
  }

  render() {
    const {error, auth, isProtected} = this.props;
    if (error.size) {
      return <Error />;
    }
    return (
      <div className={styles.appContainer}>
        {isProtected &&
          <div className={styles.topMenu}>
            <div>
              {auth.firstName} {auth.lastName}{' '}
              <Icon name="sign out" onClick={this.logout} />
            </div>
          </div>}
        <div className={styles.app}>
          <Switcher />
        </div>
      </div>
    );
  }
}

const mapState = ({
 auth, page, direction, error, location
}) => ({
  page,
  auth,
  direction,
  error,
  isProtected: (location.routesMap[location.type] || {}).protected
});

export default connect(mapState)(App);
