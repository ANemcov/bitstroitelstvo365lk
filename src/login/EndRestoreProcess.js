import React, { Component } from 'react';
import { connect } from 'react-redux';

var axios = require('axios');

const SerPasswordForm = (props) => 
<div className="card">
    <div className="header">
        <h4 className="title text-center">Изменение пароля</h4>
    </div>
    <div className="content">
        <form onSubmit={props.onSubmit}>
            <div className="row">
                <div className="col-md-12">
                    <p>Введите полученный письмом код восстановления и новый пароль.</p>
                    <div className="form-group">
                        <label>Код восстановления</label>
                        <input type="text" className="form-control" placeholder="7105ba28-9e69-40b6-b231-d892ed3b8cdf" required onChange={props.onCodeChange} value={props.code} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                        <label>Новый пароль</label>
                        <input type="password" className="form-control" placeholder="новый пароль" aria-describedby="helpBlockPassword" required pattern="[0-9a-zA-Z!@#$%^*(){};:]{7,}" onChange={props.onPasswordChange} />
                        <p id="helpBlockPassword" className="help-block"><small>Не менее 7 символов: латинские буквы, цифры, спецсимволы</small></p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                        <label>Новый пароль (повтор)</label>
                        <input type="password" className="form-control" placeholder="новый пароль" required onChange={props.onPassword2Change} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 text-center">
                    <button type="submit" className="btn btn-success btn-fill" disabled={props.inProgress}>Установить пароль</button>
                    {props.inProgress ? <ResetInProgress /> : null}
                    {props.success ? <ResetSuccessful /> : null}
                    {props.error ? <ResetError errorText={props.errorText} /> : null}
                </div>
            </div>
        </form>
    </div>
</div>

const ResetInProgress = (props) => 
<div className="text-center">
    <i className="fa fa-refresh fa-spin fa-3x fa-fw"></i>
</div>

const ResetSuccessful = (props) => 
<p className="content text-center text-success">
    <strong>
        <i className="fa fa-check" aria-hidden="true"></i> Пароль будет изменен в течение 1 минуты
    </strong>
</p>

const ResetError = (props) => 
<div className="content">
    <p className="text-center text-danger">
        <strong>
            Произошла ошибка: {props.errorText}
        </strong>
    </p>
    <p>
        Чтобы разобраться с ошибкой напишите на почту <a href="mailto:support@bit-stroitelstvo.ru">support@bit-stroitelstvo.ru</a> с адреса, который был указан при регистрации.
    </p>
</div>


class EndRestoreProcess extends Component {
    constructor(props) {
        super(props);

        this.state = {
            code: props.code,
            password: "",
            password2: "",
            inProgress: false,
            success: false,
            error: false,
            errorText: "Неверный код активации"
        }

        this.onSubmit = this.onSubmit.bind(this);
    }   
    
    componentWillReceiveProps(nextProps) {
        this.setState({code: nextProps.code});
    } 
    
    render() {
        return (
                <SerPasswordForm onSubmit={this.onSubmit}
                                onCodeChange={this.onCodeChange}
                                onPasswordChange={this.onPasswordChange}
                                onPassword2Change={this.onPassword2Change}                                
                                inProgress={this.state.inProgress}
                                code={this.state.code}
                                success={this.state.success}
                                error={this.state.error}
                                errorText={this.state.errorText}
                />
        );
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.state.password !== this.state.password2) {
            this.setState({
                error: true,
                errorText: "Введенные пароли не совпадают"
            });
            return;
        }

        this.setState({inProgress: true});
        
        axios.get(this.props.basePublicURL + `/account/password/set/${this.state.code}/${this.state.password}`
        ).then((response) => {
            this.setState({
                inProgress: false,
                success: true,
                error: false
            });
        })
        .catch((error) => {
            this.setState({
                inProgress: false,
                success: false,
                error: true,
                errorText: error.response === undefined ? "ошибка соединения" : error.response.data
            });
        });    
    }

    onCodeChange = (e) => {this.setState({code: e.target.value})}   
    onPasswordChange = (e) => {this.setState({password: e.target.value})}   
    onPassword2Change = (e) => {this.setState({password2: e.target.value})}   
    
}

const mapStateToProps = (state) => {
    return {
        basePublicURL: state.basePublicURL,
    };
}

export default connect(mapStateToProps)(EndRestoreProcess);