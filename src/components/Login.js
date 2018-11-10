import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {Button, Divider, Icon, Input} from 'semantic-ui-react';
import Link from 'redux-first-router-link';
import {connect} from 'react-redux';
import GoogleLogin from 'react-google-login';

import styles from '../css/Login';
import {loginUser, verifyFacebookToken} from '../actions';
import texts from '../texts';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'amit.rotbard@gmail1.com',
      password: 'am053450'
    };
    this.login = this.login.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.facebookResponse = this.facebookResponse.bind(this);
  }

  onFieldChange(e) {
    const {name, value} = e.target;
    this.setState(prevState => {
      return {...prevState, [name]: value};
    });
  }

  async login() {
    this.props.dispatch(loginUser(this.state));
  }

  facebookResponse(response) {
    this.props.dispatch(verifyFacebookToken(response));
  }

  render() {
    return (
      <div className={styles.loginContainer}>
        <div>
          <div className={styles.loginHeader}>
            Login to your accont
          </div>
          <div className={styles.loginBox}>
            <div className={styles.loginBoxInner}>
              <div>
                <GoogleLogin
                  clientId="1082876692474-4f1n956n709jtmufln04rjbnl09fqlni.apps.googleusercontent.com"
                  onSuccess={this.googleResponse}
                  render={renderProps =>
                    (<Button
                      fluid
                      size="large"
                      color="google plus"
                      className={styles.socialButton}
                      onClick={renderProps.onClick}
                    >
                      <Icon name="google" /> Google
                     </Button>)}
                />
                <FacebookLogin
                  appId="476316572540105"
                  autoLoad={false}
                  fields="name,email,picture,app_name"
                  callback={this.facebookResponse}
                  render={renderProps =>
                    (<Button
                      fluid
                      size="large"
                      color="facebook plus"
                      className={styles.socialButton}
                      onClick={renderProps.onClick}
                    >
                      <Icon name="facebook" /> Facebook
                     </Button>)}
                />
              </div>
              <div className={styles.loginFormInput}>
                <Input
                  icon="at"
                  iconPosition="left"
                  placeholder="Email"
                  onChange={this.onFieldChange}
                  value={this.state.email}
                  name="email"
                  fluid
                />
              </div>
              <div className={styles.loginFormInput}>
                <Input
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  name="password"
                  onChange={this.onFieldChange}
                  type="password"
                  value={this.state.password}
                  fluid
                />
              </div>
              <div className={styles.loginFormInput}>
                <Button fluid primary onClick={this.login}>
                  {texts.getText('login', 'loginButton')}
                </Button>
              </div>
              <div>
                <Divider />
                <div>
                  {texts.getText('login', 'noAccount')}
                  <Link to="/register">
                    {texts.getText('login', 'register')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Login);

Login.propTypes = {};
Login.defaultProps = {};
