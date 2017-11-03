import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
var axios = require('axios');

const LoadingScreen = () => 
<div className="card">
    <div className="header">
        <h1>Подключенные тарифы</h1>
    </div>
    <div className="content">
        <div className="text-center"><i className="fa fa-refresh fa-spin fa-3x fa-fw"></i></div>
    </div>
</div>


const DataScreen = (props) => 
<div className="card">
    <div className="header">
        <h1>Подключенные тарифы</h1>
    </div>
    <div className="content">
        { props.tariffs.length === 0 ? <NoTariffs /> :
            props.tariffs.map((tariff,index) => <SingleTariff tariff={tariff} key={index} />)}
    </div>
</div>

const NoTariffs = () =>
<p>Еще не подключено ни одного тарифа. Выберите один доступных из тарифов для подключения.</p>


const SingleTariff = (props) => 
<div className="panel panel-default">
    <div className="panel-heading">{props.tariff.App.Name}</div>
    <div className="panel-body">
        <div className="row">
            <div className="col-md-4">
                {props.tariff.App.Name}
            </div>
            <div className="col-md-4">
                {props.tariff.Tariff.Name}
            </div>
            <div className="col-md-2">
                {props.tariff.Nusers}
            </div>
            <div className="col-md-2">
                <Link to={{pathname: "/tariffs/edit", state: {tariff: props.tariff}}}>
                    <button className="btn btn-info">Изменить</button>
                </Link>
            </div>
        </div>
    </div>
</div>


class MyTariffs extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            tariffs: [],
            isFetching: true
        };
      }
    
    componentDidMount() {

        axios.get(this.props.basePrivateURL + '/mytariffs',
            {
                auth: {
                    username: this.props.credentials.login,
                    password: this.props.credentials.password
                }
            }
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
        basePrivateURL: state.basePrivateURL,
        credentials: state.credentials
    };
}


export default connect(mapStateToProps)(MyTariffs);