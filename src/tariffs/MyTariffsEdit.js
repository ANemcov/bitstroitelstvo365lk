import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import SingleTariffForm from './SingleTariffForm.js';
import Price from './Price.js';
var axios = require('axios');


const Wrapper = (props) => 
<div className="main-panel">
    <div className="content">
        <div className="card">
            <div className="header">
                <h1>Изменение тарифа</h1>
            </div>
            <div className="content">
                {props.children}
            </div>
        </div>
    </div>
</div>

const LoadingScreen = () => 
<div className="text-center">
    <i className="fa fa-refresh fa-spin fa-3x fa-fw"></i>
</div>

class EditMyTariff extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            mytariff: this.props.location.mytariff,
            tariff: undefined,
            isFetching: true,
            nusers: this.props.location.mytariff.Nusers,
            modules: this.props.location.mytariff.Modules.map(elem => elem.Id),
            options: [],
            name : "",
            timezone: "",
            inProgress: false,
            success: false,
            error: false,
            errorText: ""            
        };

    }

    componentDidMount() {
        axios.get(this.props.basePublicURL + `/tariffs/${this.state.mytariff.Tariff.Id}`
        ).then( response => {
            if (response.status === 200) {
                this.setState({
                    isFetching: false,
                    tariff: response.data
                });
            }
        });
    }    

    render() {
        return(
            <Wrapper><div className="row">    
                { this.state.isFetching ?
                <div className="col-md-6">
                    <LoadingScreen />
                </div> :
                <div className="col-md-6">
                    <SingleTariffForm 
                        mytariff={this.state.mytariff} 
                        tariff={this.state.tariff} 
                        onUsersChange={this.onUsersChange}
                        onModuleChange={this.onModuleChange}
                        onTimezoneChange={this.onTimezoneChange}
                        onNameChange={this.onNameChange}                    
                    />

                    <div className="row">
                        <div className="col-md-12">
                            <div className="text-center"><p>
                                Цена: <Price id={this.state.mytariff.TariffId} modules={this.state.modules} options={this.state.options} nusers={this.state.nusers} /> руб. за {this.state.mytariff.Tariff.Periodicity.toLowerCase()}
                            </p></div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/tariffs">
                                <button className="btn btn-warning btn-fill"><i className="fa fa-arrow-circle-left"></i> Назад</button>
                            </Link>
                            <button className="btn btn-success btn-fill pull-right" disabled><i className="fa fa-floppy-o"></i> Сохранить</button>
                            <button className="btn btn-danger btn-fill pull-right" disabled><i className="fa fa-ban"></i> Отключить</button>
                        </div>
                    </div>
                </div>

                }
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
    
    modifyTariff = () => {
        this.setState({inProgress: true});
        

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
        basePublicURL: state.basePublicURL,
        basePrivateURL: state.basePrivateURL,
        credentials: state.credentials
    };
}


export default connect(mapStateToProps)(EditMyTariff);
