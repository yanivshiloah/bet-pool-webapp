/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {boundClass} from 'autobind-decorator';
import {Button, Divider, Icon, Input} from 'semantic-ui-react';
import Link from 'redux-first-router-link';
import {connect} from 'react-redux';
import GoogleLogin from 'react-google-login';
import {loginUser, verifyFacebookToken} from '../actions';
import texts from '../texts';
import styles from '../css/Login';

const SOCIAL_IDS = {
  GOOGLE:
    '1082876692474-4f1n956n709jtmufln04rjbnl09fqlni.apps.googleusercontent.com',
  FB: '476316572540105'
};

const renderFacebookLoginButton = renderProps => {
  return (
    <Button
      fluid
      size="large"
      color="facebook plus"
      className={styles.socialButton}
      onClick={renderProps.onClick}
    >
      <Icon name="facebook" /> Facebook
    </Button>
  );
};

const renderGoogleLoginButton = renderProps => {
  return (
    <Button
      fluid
      size="large"
      color="google plus"
      className={styles.socialButton}
      onClick={renderProps.onClick}
    >
      <Icon name="google" /> Google
    </Button>
  );
};

@connect()
@boundClass
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'yanivshiloah@blabla.com',
      password: 'redhouse2310'
    };
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
            {texts.getText('login', 'title')}
          </div>
          <div className={styles.loginBox}>
            <div className={styles.loginBoxInner}>
              <div className={styles.loginSocial}>
                <GoogleLogin
                  clientId={SOCIAL_IDS.GOOGLE}
                  onSuccess={this.googleResponse}
                  render={renderGoogleLoginButton}
                />
                <FacebookLogin
                  appId={SOCIAL_IDS.FB}
                  autoLoad={false}
                  fields="name,email,picture,app_name"
                  callback={this.facebookResponse}
                  render={renderFacebookLoginButton}
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
                <div className={styles.registerContainer}>
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
