import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Wrapper from '../common/SingleColumnWrapper.js'

var axios = require('axios');

const LoginForm = (props) => 
<div className="card">
    <div className="header">
        <h4 className="title text-center">Вход в личный кабинет</h4>
    </div>
    <div className="content">
        <form onSubmit={props.onSubmit}>
            <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                        <label>Логин</label>
                        <input type="text" className="form-control" required onChange={props.onLoginChange} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                        <label>Пароль</label>
                        <input type="password" className="form-control" required onChange={props.onPasswordChange} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <button type="submit" className="btn btn-success btn-fill" disabled={props.inProgress}>Войти в кабинет</button>
                    <Link to="/restore">
                        <button className="btn btn-warning pull-right">Забыли пароль?</button>
                    </Link>
                </div>
            </div>
        </form>
    </div>
</div>

const LoginError = (props) => 
<div className="card">
    <div className="content">
        <p className="text-center text-danger"><strong>
            Произошла ошибка: {props.errorText}
        </strong></p>
        <p>
            Проверьте свой логин и пароль. Если считаете, что все верно - напишите нам о проблеме на <a href="mailto:support@bit-stroitelstvo.ru">support@bit-stroitelstvo.ru</a> с адреса, который был указан при регистрации.
        </p>
    </div>
</div>

const NewUserInfo = () =>
<div className="card">
    <div className="header">
        <h4 className="title text-center">Нет учетной записи?</h4>
    </div>
    <div className="content">
        <div className="row">
            <div className="col-md-12">
                <p className="text-center">
                    Узнать больше: <a href="http://bitstroitelstvo365.ru">bitstroitelstvo365.ru</a>, <a href="https://www.facebook.com/bitstroitelstvo365/"><i className="fa fa-facebook-square"></i></a> <a href="https://www.youtube.com/channel/UCGiP8c_Po5bt4ENDYUw7S6Q"><i className="fa fa-youtube-square"></i></a>
                </p>
                <p className="text-center">
                    Можете зарегистрироваться самостоятельно
                    <Link to="/newcustomer">
                        <button className="btn btn-success">Регистрация</button>
                    </Link>                    
                </p>
                <p className="text-center">Можем помочь по телефону <strong>+7 (812) 677-01-77</strong></p>
            </div>
        </div>
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

        return (
            <Wrapper>
                <LoginForm onSubmit={this.onSubmit} onLoginChange={this.onLoginChange} onPasswordChange={this.onPasswordChange} inProgress={this.props.isLoginPending}/>
                {loginError && <LoginError errorText={loginError} />}
                {isLoginPending && <div className="text-center"><i className="fa fa-refresh fa-spin fa-3x fa-fw"></i></div>}
                {isLoginSuccess && <Redirect to={'/'} /> }
                <NewUserInfo />
            </Wrapper>);
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

        axios.get(this.props.basePrivateURL + '/authenticate',
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

            if (error.response) {
                if (error.response.status === 401) {
                    this.props.dispatch({
                        type: "LOGIN_ERROR",
                        text: "Указаны неверные данные для входа"
                    });
                } else {
                    this.props.dispatch({
                        type: "LOGIN_ERROR",
                        text: error.response.data
                    });
                }
            } else {
                this.props.dispatch({
                    type: "LOGIN_ERROR",
                    text: error.message
                });
            }

        });

    }    

}

const mapStateToProps = (state) => {
    return {
        basePrivateURL: state.basePrivateURL,
        isLoginPending: state.loginProcess.isLoginPending,
        isLoginSuccess: state.loginProcess.isLoginSuccess,
        loginError: state.loginProcess.loginError
    };
}

export default connect(mapStateToProps)(Login);
