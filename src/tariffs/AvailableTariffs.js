import React, { Component } from 'react';
import { connect } from 'react-redux';
import Price from './Price.js';
var axios = require('axios');

const LoadingScreen = () => 
    <div className="card">
        <div className="header">
            <h1>Доступные тарифы</h1>
        </div>
        <div className="content">
            <div className="text-center"><i className="fa fa-refresh fa-spin fa-3x fa-fw"></i></div>
        </div>
    </div>


const DataScreen = (props) => 
    <div className="card">
        <div className="header">
            <h1>Доступные тарифы</h1>
        </div>
        <div className="content">
            {props.tariffs.map(tariff => <SingleTariff tariff={tariff} key={tariff.TariffId} />)}
        </div>
    </div>

const SingleTariff = (props) => 
    <div className="row">
        <div className="col-md-4">
            {props.tariff.TariffName}
        </div>
        <div className="col-md-2">
            {"до " + props.tariff.MaxAmountOfLicenses + " пользователей"}
        </div>
        <div className="col-md-2">
            от <Price id={props.tariff.TariffId} modules={props.tariff.Modules} options={props.tariff.Options} nusers={props.tariff.MinAmountOfLicenses} /> руб.
        </div>
        <div className="col-md-4">
            <button className="btn btn-info">Подключить</button>            
        </div>
    </div>


class AvailableTariffs extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            tariffs: [],
            isFetching: true
        };
      }
    
    componentDidMount() {
        
        axios.get(this.props.basePublicURL + '/tariffs'
        ).then((response) => {
            
            if (response.status === 200) {
                this.setState({
                    tariffs: response.data, 
                    isFetching: false
                });
            }
    
        });
    
    }

    render() {
        return(
            this.state.isFetching ? <LoadingScreen /> : <DataScreen tariffs={this.state.tariffs} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        basePublicURL: state.basePublicURL,
    };
}

export default connect(mapStateToProps)(AvailableTariffs);