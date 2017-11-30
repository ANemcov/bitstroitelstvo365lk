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
    <div className="panel-heading">
        <strong>{props.tariff.App.Name} </strong>
        {props.tariff.Blocked && <span className="text-danger"><i className="fa fa-ban" aria-hidden="true"></i> финансовая блокировка</span>}
        {props.tariff.Canceled && <span className="text-danger"><i className="fa fa-ban" aria-hidden="true"></i> отключен</span>}
        {(!props.tariff.Blocked && !props.tariff.Canceled) && <span className="text-success"><i className="fa fa-check" aria-hidden="true"></i> активный</span>}
        {props.tariff.TestPeriodOn && <span className="text-warning"><i className="fa fa-exclamation" aria-hidden="true"></i>тестовый период до {new Date(props.tariff.TestPeriodEndDate).toLocaleString("ru", {year: "numeric", month: "short", day: "numeric", hour: undefined, minute: undefined, second: undefined})}</span>}
    </div>
    <div className="panel-body">
        <div className="row">
            <div className="col-md-4">
                Тариф: {props.tariff.Tariff.Name}
            </div>
            <div className="col-md-4">
                Одновременных подключений: {props.tariff.Nusers}
            </div>
            <div className="col-md-2">
                {props.tariff.Cost} руб. в {props.tariff.Tariff.Periodicity.toLowerCase()}                
            </div>
            <div className="col-md-2">
                <Link to={{pathname: "/tariffs/edit", state: {tariff: props.tariff}}}>
                    <button className="btn btn-warning" disabled>Изменить</button>
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
                    tariffs: response.data, 
                    //tariffs: [],
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