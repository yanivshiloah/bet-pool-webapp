import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from '../css/Login.css';
import FacebookLogin from 'react-facebook-login';
import {Button, Divider, Input} from 'semantic-ui-react';
import {register, registerWithFacebookToken} from '../actions';
import {connect} from 'react-redux';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            password2: '',
            firstName: '',
            lastName: ''
        };
        this.register = this.register.bind(this);
        this.onFieldChange = this.onFieldChange.bind(this);
        this.facebookResponse = this.facebookResponse.bind(this);
    }

    onFieldChange(e) {
        const {name, value} = e.target;
        this.setState(prevState => {
            return _.assign({}, prevState, {[name]: value});
        });
    }

    async register() {
        this.props.dispatch(register(this.state));
    }

    facebookResponse(response) {
        this.props.dispatch(registerWithFacebookToken(response));
    }

    render() {
        const {password, password2, email} = this.state;
        const isFormDisabled = email.trim() === '' || password.trim() === '' || password2.trim() === '' ||
            password !== password2;
        return (
            <div className={styles.loginContainer}>
                <div>
                    <div className={styles.loginBox}>
                        <div>
                            <FacebookLogin textButton="Register with Facebook"
                                           appId="476316572540105"
                                           autoLoad={false}
                                           fields="name,email,picture,app_name"
                                           callback={this.facebookResponse}
                            />
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
                                <Input icon='lock' iconPosition='left' placeholder='Repeat Password'
                                       name="password2"
                                       onChange={this.onFieldChange}
                                       type="password" value={this.state.password2} fluid />
                            </div>
                            <div className={styles.loginFormInput}>
                                <Input placeholder='First Name'
                                       name="firstName"
                                       onChange={this.onFieldChange}
                                       value={this.state.firstName} fluid />
                            </div>
                            <div className={styles.loginFormInput}>
                                <Input placeholder='Last Name'
                                       name="lastName"
                                       onChange={this.onFieldChange}
                                       value={this.state.lastName} fluid />
                            </div>
                            <div className={styles.loginFormInput}>
                                <Button disabled={isFormDisabled} fluid primary
                                        onClick={this.register}>Register</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(Register);

Register.propTypes = {};
Register.defaultProps = {};