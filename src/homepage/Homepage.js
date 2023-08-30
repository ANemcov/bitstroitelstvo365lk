import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import CreateTestBase from './CreateTestBase.js';
import noApps from '../images/no-apps.png';
// import ModalLauncher from "../components/ModalLauncher";
import Modal from "../components/ModalDialog";
import "../components/ModalDialog.css"

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
                <div className="text-center"><i className="fa fa-refresh fa-spin fa-3x fa-fw"/></div>
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
                    props.apps.filter(app => app.StatusId !== 'deleted').map(app => <SingleApp app={app}
                                                                                               key={app.Id}
                                                                                               onResetSessions={() => props.onResetSessions(app.Realm)}
                                                                                               canReset={props.canReset}/>)}
                <div>
                    <button className="btn btn-default" onClick={props.refresh}>
                        <i className="fa fa-refresh" aria-hidden="true"/>
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
            <div className="col-md-4">
                {props.app.Status}
                {props.app.URL && <span> ( <a href={props.app.URLWithCredentials} target="_blank">{props.app.URL}</a> )</span>}
            </div>
            <div className="col-md-4 text-left">
                {props.app.URL && <a href={props.app.URLWithCredentials} target="_blank" className="btn btn-success btn-sm btn-fill"><strong>Начать работу в базе</strong></a>}
                {/*TODO добавить проверку прав*/}
                {/*{props.app.Realm &&*/}
                {/*    <button*/}
                {/*        className="btn btn-warning btn-sm"*/}
                {/*        onClick={(event => {props.onResetSessions(props.app.Realm)})} >*/}
                {/*        Сбросить сеансы*/}
                {/*    </button>*/}
                {/*}*/}
                {/*{props.canReset && <ModalLauncher showModal={props.showModal} onSuccess={props.app.Realm} buttonCaption={"Сбросить сеансы"}/> }*/}
                {props.canReset && <button className="btn btn-warning btn-sm"
                                           onClick={() => props.onResetSessions()} >Сбросить сеансы
                </button>}
            </div>

        </div>
    </div>
</div>


const Information = () =>
<div className="container-fluid">
    <div className="row">
        <div className="card">
            <div className="content">
                <i className="fa fa-info-circle" aria-hidden="true"/>
                Можно использовать <strong>тонкий клиент</strong> вместо браузера. <a href="https://bitstroitelstvo.getcourse.ru/tonkiiklient">Перейти в базу знаний</a>
            </div>
        </div>
        </div>
        <div className="row">
        <div className="card">
            <div className="content">
                <i className="fa fa-info-circle" aria-hidden="true"/>
                Подключение, отключение и изменение параметров приложений производится в разделе <Link to="/tariffs">Настройки тарифов</Link>.
            </div>
        </div>
    </div>
</div>

const Welcome = (props) =>
<div className="container-fluid">
    <div className="row">
        <div className="col-md-4" style={{height: 180}}>
            <div className="card" style={{height: 160}}>
                <div className="content">
                    <p className="text-center">Посмотреть интерфейс программы с помощью интерактивного кейса по бухгалтерскому учету</p>
                    <div className="text-center" style={{ width: "100%", left: 0, bottom: 30, position: "absolute"}}><a href="https://bitstroitelstvo.getcourse.ru/casebyhgalterskiiuchet" target="_blank" rel="noopener noreferrer">
                        <button className="btn btn-success btn-fill">Открыть курс</button>
                    </a></div>
                </div>
            </div>
        </div>

        <div className="col-md-4" style={{height: 180}}>
            <div className="card" style={{height: 160}}>
                <CreateTestBase onCreate={props.getApplications} apps={props.apps}/>
            </div>
        </div>


        <div className="col-md-4" style={{height: 180}}>
            <div className="card" style={{height: 160}}>
                <div className="content">
                    <p className="text-center">Загрузить данные из вашей текущей 1С в тестовую базу</p>
                    <div className="text-center" style={{ width: "100%", left: 0, bottom: 30, position: "absolute"}}>
                        <Link to="/loadmydata">
                            <button className="btn btn-info">Перейти</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>        
    </div>
</div>


class Homepage extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            applications: [],
            isFetching: true,
            isModalShow: false,
            droppedRealm: null
        };

      }
    
    componentDidMount() {
        this.getApplications();
    }

    render() {
        return(
            <Container>
                <Modal show={this.state.droppedRealm}
                       onConfirm={() => this.resetApp()}
                       onCancel={this.hideModal}
                       modalTitle={"Завершение сеансов в области."}>
                    Вы уверены, что хотите принудительно завершить все сеансы? <br/> После нажатия кнопки «ОК» система приступит к закрытию сеансов, что может занять некоторое время (даже после закрытия данного окна).
                </Modal>
                <Welcome getApplications={this.getApplications} apps={this.state.applications} />
                {this.state.isFetching ? <LoadingScreen /> : <DataScreen apps={this.state.applications}
                                                                         refresh={this.getApplications}
                                                                         onResetSessions={(Realm) => this.onResetSessions(Realm)}
                                                                         canReset={!this.state.droppedRealm}/>}
                <Information />
            </Container>
        );
    }

    hideModal = () => {
        this.setState({
            droppedRealm: null
        })
    }

    onResetSessions(Realm) {
        this.setState(
            {droppedRealm: Realm}
        )
    }

    resetApp() {
        const Realm = this.state.droppedRealm;

        this.setState({
            droppedRealm: null
        });

        axios.get(this.props.basePrivateURL + `/resetSessions/${Realm}`,
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
            console.log("Drop result " + JSON.stringify(response.status) + " => " + JSON.stringify(response.data));
            if (response.status === 200) {
                this.getApplications();
            }
        });
    }

    getApplications = () => {

        this.setState({
            isFetching: true
        });

        axios.get(this.props.basePrivateURL + '/myapplications',
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
