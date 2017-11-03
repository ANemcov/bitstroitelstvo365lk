import React, { Component } from 'react';
import { connect } from 'react-redux';
import Wrapper from '../common/SingleColumnWrapper.js'

var axios = require('axios');

const NewcustomerForm = (props) => 
<div className="card">
    <div className="header">
        <h4 className="title text-center">Самостоятельная регистрация</h4>
    </div>
    <div className="content">
        <form onSubmit={props.onSubmit}>

            <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                        <label>Название компании</label>
                        <input type="text" className="form-control" placeholder="ООО Строительное Управление 20" required onChange={props.onCompanyChange} />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                        <label>ФИО (полностью)</label>
                        <input type="text" className="form-control" placeholder="Петров Петр Петрович" required onChange={props.onFIOChange} />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                        <label>Контактный телефон</label>
                        <input type="text" className="form-control" placeholder="+7916XXXXXXX" required onChange={props.onPhoneChange} />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                        <label>Электронная почта</label>
                        <input type="email" className="form-control" placeholder="mail@mail.ru" aria-describedby="helpBlockMail" required pattern="[0-9a-zA-Z_\.]+@[0-9a-zA-Z_\.]+" onChange={props.onMailChange} />
                        <p id="helpBlockMail" className="help-block"><small>Почта будет использоваться для входа в систему</small></p>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                        <label>Пароль</label>
                        <input type="password" className="form-control" aria-describedby="helpBlockPassword" required pattern="[0-9a-zA-Z!@#$%^*(){};:]{7,}" onChange={props.onPasswordChange} />
                        <p id="helpBlockPassword" className="help-block"><small>Не менее 7 символов: латинские буквы, цифры, спецсимволы</small></p>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <p className="text-center">
                        Вы получите письмо с кодом активации на почту
                    </p>
                    <p className="text-center">
                        <button type="submit" className="btn btn-success btn-fill" disabled={props.inProgress}>Начать регистрацию</button><br />
                    </p>
                </div>
            </div>
        </form>
    </div>
</div>

const RegistrationInProgress = (props) => 
<div className="card">
    <div className="content">
        <div className="text-center"><i className="fa fa-refresh fa-spin fa-3x fa-fw"></i></div>
    </div>
</div>

const RegistrationSuccessful = (props) => 
<div className="card">
    <div className="content">
        <p className="text-center text-success"><strong>
            Регистрация прошла успешно
        </strong></p>
        <p>
            Проверьте вашу почту: в письме от нас будет ссылка для активации учетной записи.
        </p>
    </div>
</div>

const RegistrationError = (props) => 
<div className="card">
    <div className="content">
        <p className="text-center text-danger"><strong>
            Произошла ошибка: {props.errorText}
        </strong></p>
        <p>
            Чтобы разобраться с ошибкой напишите нам на почту <a href="mailto:support@bit-stroitelstvo.ru">support@bit-stroitelstvo.ru</a> с адреса, который был указан при регистрации.
        </p>
    </div>
</div>

class Newcustomer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            company: "",
            fullname: "",
            phone: "",
            mail: "",
            password: "",
            inProgress: false,
            success: false,
            error: false,
            errorText: "Такая почта уже используется"            
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onCompanyChange = this.onCompanyChange.bind(this);
        this.onFIOChange = this.onFIOChange.bind(this);
        this.onPhoneChange = this.onPhoneChange.bind(this);
        this.onMailChange = this.onMailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    render() {
        return (
            <Wrapper>
                <NewcustomerForm onSubmit={this.onSubmit}
                                onCompanyChange={this.onCompanyChange}
                                onFIOChange={this.onFIOChange}
                                onPhoneChange={this.onPhoneChange}
                                onMailChange={this.onMailChange}
                                onPasswordChange={this.onPasswordChange}
                                inProgress={this.state.inProgress}
                />
                {this.state.inProgress ? <RegistrationInProgress /> : null}
                {this.state.success ? <RegistrationSuccessful /> : null}
                {this.state.error ? <RegistrationError errorText={this.state.errorText} /> : null}
             </Wrapper>);
    }

    onSubmit(e) {
        e.preventDefault();
        this.beginRegistration();
    }

    onCompanyChange(e) {
        this.setState({company: e.target.value});
    }
    onFIOChange(e) {
        this.setState({fullname: e.target.value});
    }
    onPhoneChange(e) {
        this.setState({phone: e.target.value});
    }
    onMailChange(e) {
        this.setState({mail: e.target.value});
    }
    onPasswordChange(e) {
        this.setState({password: e.target.value});
    }


    beginRegistration() {
        
        this.setState({inProgress: true});
        
        axios.get(this.props.basePublicURL + '/account/registration',
        {          
            params: {
                company: this.state.company,
                login: this.state.mail,
                mail: this.state.mail,
                name: this.state.fullname,
                password: this.state.password,
                tel: this.state.phone
            }
        }
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

}    



const mapStateToProps = (state) => {
    return {
        basePublicURL: state.basePublicURL,
    };
}

export default connect(mapStateToProps)(Newcustomer);