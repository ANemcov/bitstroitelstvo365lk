import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import noApps from './images/no-apps.png';
var axios = require('axios');


const Container = (props) =>
<div className="main-panel">
    <div className="content">
        {props.children}
    </div>
</div>

const LoadingScreen = () => 
<div className="container-fluid">
    <div className="row">
        <div className="card">
            <div className="header">
                <h1>Ваши приложения</h1>
            </div>
            <div className="content">
                <div className="text-center"><i className="fa fa-refresh fa-spin fa-3x fa-fw"></i></div>
            </div>
        </div>
    </div>
</div>





const DataScreen = (props) => 
<div className="container-fluid">
    <div className="row">
        <div className="card">
            <div className="header">
                <h1>Ваши приложения</h1>
            </div>
            <div className="content">
                { props.apps.length === 0 ? <NoApps /> :
                    props.apps.map(app => <SingleApp app={app} key={app.Id} />)}
                <div>
                    <button className="btn btn-default" onClick={props.refresh}>
                        <i className="fa fa-refresh" aria-hidden="true"></i>
                        Обновить
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

const NoApps = () =>
<div className="row">
    <div className="col-md-2">
        <img src={noApps} className="img-responsive" alt="" />
    </div>
    <div className="col-md-10">
        <p><strong>Еще нет ни одного приложения.</strong></p>
        <p>Для подключения перейдите в раздел <Link to="/tariffs">Настройки тарифов</Link>.</p>
        <p>Там можно создать бесплатную тестовую базу и попробовать систему в действии.</p>
    </div>    
</div>

const SingleApp = (props) => 
<div className="panel panel-default">
    <div className="panel-heading">
        <strong>{props.app.Name}</strong>
    </div>
    <div className="panel-body">
        <div className="row">
            <div className="col-md-4">
                {props.app.ConfigName + " версии " + props.app.ConfigVersionName}
            </div>
            <div className="col-md-2">
                {props.app.Status}
            </div>
            <div className="col-md-6">
                {props.app.URL && <span>Перейти в приложение: <a href={props.app.URLWithCredentials} target="_blank">
                <strong>{props.app.URL}</strong>
                </a>
                </span>
                }
            </div>
        </div>
    </div>
</div>


const Information = () =>
<div className="container-fluid">
    <div className="row">
        <div className="card">
            <div className="content">
                <i className="fa fa-info-circle" aria-hidden="true"></i>
                Можно использовать тонкий клиент вместо браузера. <a href="https://bitstroitelstvo.atlassian.net/wiki/spaces/365KB/pages/66191361/1">Перейти в базу знаний</a>
            </div>
        </div>
        </div>
        <div className="row">
        <div className="card">
            <div className="content">
                <i className="fa fa-info-circle" aria-hidden="true"></i>
                Подключение, отключение и изменение параметров приложений производится в разделе <Link to="/tariffs">Настройки тарифов</Link>.
            </div>
        </div>
    </div>
</div>


class Homepage extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            applications: [],
            isFetching: true
        };

        this.getApplications = this.getApplications.bind(this);
      }
    
    componentDidMount() {


        this.getApplications();
    
    }

    render() {
        return(
            <Container>
                {this.state.isFetching ? <LoadingScreen /> : <DataScreen apps={this.state.applications} refresh={this.getApplications} />}
                <Information />
            </Container>
        );
    }

    getApplications() {

        this.setState({
            isFetching: true
        });

        axios.get(this.props.basePrivateURL + '/myapplications',
            {
                auth: {
                    username: this.props.credentials.login,
                    password: this.props.credentials.password
                }
            }
        ).then((response) => {
            
            if (response.status === 200) {
                this.setState({
                    applications: response.data,
                    //applications: [], 
                    isFetching: false
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

export default connect(mapStateToProps)(Homepage);
