import React, { Component } from 'react';
import { connect } from 'react-redux';

var axios = require('axios');

const NewcustomerForm = (props) => 
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">

                <Header />

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
                                        <input type="mail" className="form-control" placeholder="mail@mail.ru" aria-describedby="helpBlockMail" required pattern="[0-9a-zA-Z_\.]+@[0-9a-zA-Z_\.]+" onChange={props.onMailChange} />
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
                                        <button type="submit" className="btn btn-success btn-fill">Начать регистрацию</button><br />
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-md-4"></div>
        </div>
    </div>

const Header = () =>
<div style={{marginTop: "50px", marginBottom: "20px"}}>
    <div className="header">
        <h4 className="title text-center">
            <span style={{color: "rgb(211, 48, 142)"}}>БИТ.</span><span style={{color: "rgb(47, 51, 141)"}}>СТРОИТЕЛЬСТВО 365</span><br />
            <small>разработано для крупных строительных компаний<br />
            и адаптировано для малых предприятий</small>
        </h4>
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
            password: ""
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
            <div>
                <NewcustomerForm onSubmit={this.onSubmit}
                                onCompanyChange={this.onCompanyChange}
                                onFIOChange={this.onFIOChange}
                                onPhoneChange={this.onPhoneChange}
                                onMailChange={this.onMailChange}
                                onPasswordChange={this.onPasswordChange}
                 />
            </div>);
    }

    onSubmit(e) {
        e.preventDefault();

        //check validity
        
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
        

    }    

}

const mapStateToProps = (state) => {
    return {
        isLoginPending: state.loginProcess.isLoginPending,
        isLoginSuccess: state.loginProcess.isLoginSuccess,
        loginError: state.loginProcess.loginError
    };
}



export default connect(mapStateToProps)(Newcustomer);
