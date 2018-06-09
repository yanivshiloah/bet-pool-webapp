import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from '../css/Login.css';
import FacebookLogin from 'react-facebook-login';
import {Button, Divider, Input} from 'semantic-ui-react';
import Link from 'redux-first-router-link';
import {loginUser, verifyFacebookToken} from '../actions';
import {connect} from 'react-redux';

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
            return _.assign({}, prevState, {[name]: value});
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
                        <div>
                            <div>
                                <FacebookLogin appId="476316572540105"
                                               autoLoad={false}
                                               fields="name,email,picture,app_name"
                                               callback={this.facebookResponse}
                                />
                            </div>
                            <div className={styles.loginFormInput}>
                                <Input icon='at' iconPosition='left' placeholder='Email'
                                       onChange={this.onFieldChange}
                                       value={this.state.email}
                                       name="email"
                                       fluid />
                            </div>
                            <div className={styles.loginFormInput}>
                                <Input icon='lock' iconPosition='left' placeholder='Password'
                                       name="password"
                                       onChange={this.onFieldChange}
                                       type="password" value={this.state.password} fluid />
                            </div>
                            <div className={styles.loginFormInput}>
                                <Button fluid primary onClick={this.login}>Login</Button>
                            </div>
                            <div>
                                <Divider />
                                Don't have an account? <Link to="/register">register</Link>
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