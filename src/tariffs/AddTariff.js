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



class AddTariff extends Component {
    constructor(props) {
        super(props);
        
        const tariff = props.location.state.tariff;
        
        this.state = {
            tariff: tariff,
            nusers: tariff.MinAmountOfLicenses,
            modules: tariff.Modules.filter(elem => elem.Mandatory).map(elem => elem.Id),
            options: [],
            name : tariff.Config.Name
        };
    }

    render() {
        return(
            <Wrapper>
                <div className="row">    
                    <div className="col-md-6">
                        <SingleTariffForm tariff={this.state.tariff} 
                            onUsersChange={this.onUsersChange}
                            onModuleChange={this.onModuleChange}
                         />

                        <div className="row">
                            <div className="col-md-12">
                                <div className="text-center"><p>
                                    Цена: <Price id={this.state.tariff.TariffId} modules={this.state.modules} options={this.state.options} nusers={this.state.nusers} /> руб.
                                </p></div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <Link to="/tariffs">
                                    <button className="btn btn-warning btn-fill"><i className="fa fa-arrow-circle-left"></i> Назад</button>
                                </Link>
                                <button className="btn btn-success btn-fill pull-right"><i className="fa fa-floppy-o"></i> Подключить</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h4>Частые вопросы</h4>
                        <p><i className="fa fa-angle-right" aria-hidden="true"></i> Цена указана без НДС (услуга не облагается НДС), в рублях РФ.</p>
                        <p><i className="fa fa-angle-right" aria-hidden="true"></i> Актирование производится последним днем каждого календарного квартала. По запросу акт высылается почтой, либо через ЭДО (с подписью - ЭЦП).</p>

                    </div>
                </div>
             </Wrapper>
        );
    }

    onUsersChange = (e) => {this.setState({nusers: e.target.value})}
    
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
}

const mapStateToProps = (state) => {
    return {
        basePrivateURL: state.basePrivateURL,
        credentials: state.credentials
    };
}


export default connect(mapStateToProps)(AddTariff);
