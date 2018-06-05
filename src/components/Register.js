import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from '../css/Login.css';
import FacebookLogin from 'react-facebook-login';
import {Button, Divider, Input} from 'semantic-ui-react';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordAgain: '',
            firstName: '',
            lastName: ''
        };
        this.register = this.register.bind(this);
        this.onFieldChange = this.onFieldChange.bind(this);
    }

    onFieldChange(e) {
        const {name, value} = e.target;
        this.setState(prevState => {
            return _.assign({}, prevState, {[name]: value});
        });
    }

    async register() {
        const res = await fetch('http://localhost:3000/api/auth/register', {
            body: JSON.stringify(this.state),
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        });
        const json = await res.json();
        console.log(json);
    }

    render() {
        const {password, passwordAgain, email} = this.state;
        const isFormDisabled = email.trim() === '' || password.trim() === '' || passwordAgain.trim() === '' ||
            password !== passwordAgain;
        return (
            <div className={styles.loginContainer}>
                <div>
                    <div className={styles.loginBox}>
                        <div>
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
                                       name="passwordAgain"
                                       onChange={this.onFieldChange}
                                       type="password" value={this.state.passwordAgain} fluid />
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

Register.propTypes = {};
Register.defaultProps = {};