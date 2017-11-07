import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SingleTariffForm from './SingleTariffForm.js';
import Price from './Price.js';
var axios = require('axios');

const Wrapper = (props) => 
<div className="main-panel">
    <div className="content">
        <div className="card">
            <div className="header">
                <h1>Добавление тарифа</h1>
            </div>
            <div className="content">
                {props.children}
            </div>
        </div>
    </div>
</div>

const AddingInProgress = (props) => 
<div className="content">
    <div className="text-center"><i className="fa fa-refresh fa-spin fa-3x fa-fw"></i></div>
</div>


const AddingSuccessful = (props) => 
<div className="content">
    <p className="text-center text-success"><strong>
        Тариф добавлен
    </strong></p>
    <p className="text-center">
        База будет готова в течение нескольких секунд. Ссылка для входа в базу появится в разделе <Link to="/">Приложения</Link>.
    </p>
</div>

const AddingError = (props) => 
<div className="content">
    <p className="text-center text-danger"><strong>
        Произошла ошибка: {props.errorText}
    </strong></p>
    <p>
        Чтобы разобраться с ошибкой напишите нам на почту <a href="mailto:support@bit-stroitelstvo.ru">support@bit-stroitelstvo.ru</a> с адреса, который был указан при регистрации.
    </p>
</div>



class AddTariff extends Component {
    constructor(props) {
        super(props);
        
        const tariff = props.location.state.tariff;
        
        this.state = {
            tariff: tariff,
            nusers: tariff.MinAmountOfLicenses,
            modules: tariff.Modules.filter(elem => elem.Mandatory).map(elem => elem.Id),
            options: [],
            name : tariff.Config.Name,
            timezone: "Europe/Moscow",
            inProgress: false,
            success: false,
            error: false,
            errorText: ""
        };
    }

    render() {
        return(
        <Wrapper><div className="row">    
            <div className="col-md-6">
                <SingleTariffForm tariff={this.state.tariff} 
                    onUsersChange={this.onUsersChange}
                    onModuleChange={this.onModuleChange}
                    onTimezoneChange={this.onTimezoneChange}
                    onNameChange={this.onNameChange}
                    />

                <div className="row">
                    <div className="col-md-12">
                        <div className="text-center">
                            <p>
                            Цена: <Price id={this.state.tariff.TariffId} modules={this.state.modules} options={this.state.options} nusers={this.state.nusers} /> руб. за {this.state.tariff.Periodicity.toLowerCase()}
                            </p>
                            <p>
                            {this.state.tariff.TestAvailable ? <span className="text-success"><i className="fa fa-check" aria-hidden="true"></i> Будет включен бесплатный тестовый период на {this.state.tariff.TestDuration} дн.</span> : null}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <Link to="/tariffs">
                            <button className="btn btn-warning btn-fill"><i className="fa fa-arrow-circle-left"></i> Назад</button>
                        </Link>
                        <button className="btn btn-success btn-fill pull-right" onClick={this.addTariff} disabled={this.state.inProgress || this.state.success}><i className="fa fa-floppy-o"></i> Подключить</button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        {this.state.inProgress ? <AddingInProgress /> : null}
                        {this.state.success ? <AddingSuccessful /> : null}
                        {this.state.error ? <AddingError errorText={this.state.errorText} /> : null}
                    </div>
                </div>

            </div>
            <div className="col-md-6">
                <h4>Частые вопросы</h4>
                <p><i className="fa fa-angle-right" aria-hidden="true"></i> Цена указана без НДС (услуга не облагается НДС), в рублях РФ.</p>
                <p><i className="fa fa-angle-right" aria-hidden="true"></i> Актирование производится последним днем каждого календарного квартала. По запросу акт высылается почтой, либо через ЭДО (с подписью - ЭЦП).</p>
            </div>
        </div></Wrapper>
        );
    }

    onUsersChange = (e) => {this.setState({nusers: e.target.value})}
    onNameChange = (e) => {this.setState({name: e.target.value})}
    onTimezoneChange = (e) => {this.setState({timezone: e.target.value})}
    onModuleChange = (e) => {
        let modules = [];
        if (e.target.checked) {
            modules = this.state.modules.concat(e.target.name);
        } else {
            modules = this.state.modules.slice();
            while (modules.indexOf(e.target.name) !== -1) {
                modules.splice(modules.indexOf(e.target.name), 1);
            }
        }
        this.setState({modules : modules});
    }

    addTariff = () => {
        this.setState({inProgress: true});
        
        //balance check ?

        axios.get(this.props.basePrivateURL + `/mytariffs/${this.state.tariff.TariffId}/add`,
        {
            auth: {
                username: this.props.credentials.login,
                password: this.props.credentials.password
            },
            params: {
                data: JSON.stringify({
                    modules: this.state.modules,
                    options: this.state.options,
                    nusers: this.state.nusers,
                    title: this.state.name,
                    timezone: this.state.timezone
                })
            }
        }
        ).then((response) => {
            
            if (response.status === 200) {

                if (response.data.Error) {
                    this.setState({
                        inProgress: false,
                        success: false,
                        error: true,
                        errorText: response.data.Error
                    });
                } else {
                    this.setState({
                        inProgress: false,
                        success: true,
                        error: false
                    });
                }
            }

        })
        .catch((error) => {
            
            if (error.response) {
                this.setState({
                    inProgress: false,
                    success: false,
                    error: true,
                    errorText: error.response.data
                });
            } else {
                this.setState({
                    inProgress: false,
                    success: false,
                    error: true,
                    text: error.message
                });
            }

        });      



    }

}

const mapStateToProps = (state) => {
    return {
        basePrivateURL: state.basePrivateURL,
        credentials: state.credentials
    };
}


export default connect(mapStateToProps)(AddTariff);
