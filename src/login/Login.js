import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';


var axios = require('axios');

const LoginForm = (props) => 
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
                <div className="card">
                    <div className="header">
                        <h4 className="title">Личный кабинет БИТ.Строительство 365</h4>
                    </div>
                    <div className="content">
                        <form onSubmit={props.onSubmit}>
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label>Логин</label>
                                        <input type="text" className="form-control" placeholder="Username" onChange={props.onLoginChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label>Пароль</label>
                                        <input type="password" className="form-control" placeholder="Password" onChange={props.onPasswordChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <button type="submit" className="btn btn-info btn-fill">Вход</button>
                                <Link to="/restore">
                                    <button className="btn btn-default pull-right">Забыли пароль?</button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-md-4"></div>
        </div>
    </div>


class Login extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onLoginChange = this.onLoginChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);

        this.state = {
            credentials: {
                login: "",
                password: ""
            }
        }
    }

    render() {
        let {isLoginPending, isLoginSuccess, loginError} = this.props;

        if (isLoginPending) {
            return (
                <div>Please wait...</div>
            )
        } else if (isLoginSuccess) {
            return (
                <Redirect to={'/'} />
                //<div>Logged in</div>
            )
        } else {
            return (
                <div>
                    <LoginForm onSubmit={this.onSubmit} onLoginChange={this.onLoginChange} onPasswordChange={this.onPasswordChange} />
                    { loginError && <div>{loginError}</div> }
                </div>);
        }

    }

    onSubmit(e) {
        e.preventDefault();
        
        this.login();
    }

    onLoginChange(e) {
        let newCredentials = {
            login: e.target.value,
            password: this.state.credentials.password
        }
        this.setState({credentials: newCredentials});
    }
    
    onPasswordChange(e) {
        let newCredentials = {
            login: this.state.credentials.login,
            password: e.target.value
        }
        this.setState({credentials: newCredentials});
    }

    login(username, password) {
        
        this.props.dispatch({
            type: "LOGIN_IN_PROGRESS"
        });

        axios.get('https://devfresh.bit-live.ru/coreprivateapi/authenticate',
        {          
            auth: {
                username: this.state.credentials.login,
                password: this.state.credentials.password
            }
        }
        ).then((response) => {

            console.log(JSON.stringify(response));
            
            if (response.status === 200) {
                
                this.props.dispatch({
                    type: "IS_LOGGED_IN",
                    login: this.state.credentials.login,
                    password: this.state.credentials.password
                });
                

            }

        })
        .catch((error) => {
            console.log("ERROR");
            console.log(error);

            this.props.dispatch({
                type: "LOGIN_ERROR",
                text: error.message
                
            });

        });


        
    }    

}

const mapStateToProps = (state) => {
    return {
        isLoginPending: state.loginProcess.isLoginPending,
        isLoginSuccess: state.loginProcess.isLoginSuccess,
        loginError: state.loginProcess.loginError
    };
}

export default connect(mapStateToProps)(Login);
