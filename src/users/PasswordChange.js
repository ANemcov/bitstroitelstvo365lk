import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

var axios = require('axios');

const Container = (props) =>
<div className="main-panel">
    <div className="content">
        <div className="container-fluid">
            <div className="row">
                {props.children}
            </div>
        </div>
    </div>
</div>

const DataScreen = (props) => 
<div className="card">
    <div className="header">
        <h1>Установка пароля</h1>
        <p>Пользователь: <strong>{props.username}</strong></p>
    </div>
    <div className="content">
        <form onSubmit={props.onSubmit}>
            <div className="row"><div className="col-md-6">
                <div className="form-group">
                    <label>Пароль</label>
                    <input type="password" className="form-control" onChange={props.onPassword1Change} required pattern="[0-9a-zA-Z!@#$%^*(){};:]{7,}" />
                    <p id="helpBlockPassword" className="help-block"><small>Не менее 7 символов: латинские буквы, цифры, спецсимволы</small></p>
                </div>
            </div></div>
            <div className="row"><div className="col-md-6">
                <div className="form-group">
                    <label>Пароль (повтор)</label>
                    <input type="password" className="form-control" onChange={props.onPassword2Change} required pattern="[0-9a-zA-Z!@#$%^*(){};:]{7,}" />
                    </div>
            </div></div>
            <div className="row"><div className="col-md-6">
                {props.children}
            </div></div>
        </form>
    </div>
</div>

const SettingInProgress = (props) => 
<div className="col-md-12">
    <div className="text-center"><i className="fa fa-refresh fa-spin fa-3x fa-fw"></i></div>
</div>

const SettingSuccessful = (props) => 
<div className="col-md-12">
    <p className="text-center text-success"><strong>
        Пароль установлен
    </strong></p>
    <p className="text-center">
       В течение минуты пользователь сможет зайти в приложения
    </p>
</div>

const SettingError = (props) => 
<div className="col-md-12">
    <p className="text-center text-danger"><strong>
        Произошла ошибка: {props.errorText}
    </strong></p>
    <p className="text-center">
        Чтобы разобраться с ошибкой напишите нам на почту <a href="mailto:support@bit-stroitelstvo.ru">support@bit-stroitelstvo.ru</a> с адреса, который был указан при регистрации.
    </p>
</div>


class PasswordChange extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            password1: "",
            password2: "",
            inProgress: false,
            success: false,
            error: false,
            errorText: "Пароли не совпадают"
        };

      }
    
    render() {
        return(
            <Container>
                <DataScreen username={this.props.location.username} 
                            onSubmit={this.onSubmit}
                            onPassword1Change={this.onPassword1Change}
                            onPassword2Change={this.onPassword2Change}>
                        <Link to="/users">
                            <button className="btn btn-warning btn-fill"><i className="fa fa-arrow-circle-left"></i> Назад</button>
                        </Link>
                        {( !this.state.inProgress && !this.state.success ) ? <button type="submit" className="btn btn-success btn-fill pull-right"><i className="fa fa-floppy-o"></i> Сохранить</button> : null}
                        {this.state.inProgress ? <SettingInProgress /> : null}
                        {this.state.success ? <SettingSuccessful /> : null}
                        {this.state.error ? <SettingError errorText={this.state.errorText} /> : null}
                </DataScreen>    
            </Container>
        );
    }

    onSubmit = (e) => {
        e.preventDefault();
        
        if (this.state.password1 !== this.state.password2) {
            this.setState({
                inProgress: false,
                success: false,
                error: true,
                errorText: "Введенные пароли не совпадают"
            });
            return;
        }    
        
        this.setState({
            inProgress: true,
            success: false,
            error: false
        });    

        axios.get(this.props.basePrivateURL + `/myemployees/${this.props.location.userid}/password/change/${this.state.password1}`,
        {
            auth: {
                username: this.props.credentials.login,
                password: this.props.credentials.password
            },
            headers: {
                'Cache-Control': 'no-cache,no-store,must-revalidate,max-age=-1,private',
                'Pragma': 'no-cache',
                'Expires': '-1'
            }
        }
        ).then((response) => {
            
            if (response.status === 200) {
                this.setState({
                    inProgress: false,
                    success: true,
                    error: false
                });  
            }

        });        
    }

    onPassword1Change = (e) => { this.setState({password1: e.target.value}); }
    onPassword2Change = (e) => { this.setState({password2: e.target.value}); }    

}
  
function mapStateToProps(state) {
    return {
        basePrivateURL: state.basePrivateURL,
        credentials: state.credentials
    }
}

export default connect(mapStateToProps)(PasswordChange)