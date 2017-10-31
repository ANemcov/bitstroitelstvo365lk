import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
                <h1>Ваши пользователи</h1>
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
                <h1>Ваши пользователи</h1>
            </div>
            <div className="content">
                {props.users.map(user => <SingleUser data={user} key={user.Id} onBlock={props.onBlock} onUnblock={props.onUnblock} />)}
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

const Information = () =>
<div className="container-fluid">
    <div className="row">
        <div className="card">
            <div className="content">
                <i className="fa fa-info-circle" aria-hidden="true"></i>
                Новые пользователи создаются непосредственно в приложении: <a href="https://bitstroitelstvo.atlassian.net/wiki/spaces/365KB/pages/75890724/.+365" target="_blank">перейти в базу знаний</a> или посмотреть <a href="https://www.youtube.com/watch?v=Bq12bNJUBs4" target="_blank">видео про добавление пользователей</a>.
            </div>
        </div>
    </div>
</div>


const SingleUser = (props) => 
<div className="panel panel-default">
    <div className="panel-heading">
        <strong>{props.data.Name} </strong>
        <small>
            {props.data.Blocked ? <span><i className="fa fa-ban" aria-hidden="true"></i> Заблокирован</span> : <span><i className="fa fa-check" aria-hidden="true"></i> Активный</span>}
        </small>
    </div>
    <div className="panel-body">
        <div className="row">
            <div className="col-md-3">
                <p>Почта: <strong>{props.data.Mail}</strong></p>
                <p>Логин: <strong>{props.data.Login}</strong></p>
            </div>
            <div className="col-md-5">
                <p>Доступ к приложениям</p>
                {props.data.Rights.map(elem => <span><i className="fa fa-angle-right" aria-hidden="true"></i>{elem.Name} - {elem.Right}<br /></span>)}
            </div>
            <div className="col-md-4">
                <ActionBlockUnblock key={props.data.Id} id={props.data.Id} blocked={props.data.Blocked} onBlock={props.onBlock} onUnblock={props.onUnblock} />
            </div>
        </div>
    </div>
</div>

class ActionBlockUnblock extends Component {
    render() {
        if (this.props.blocked) {
            return(<button className="btn btn-success" onClick={this._onUnblock}>Разблокировать</button>);
        } else {
            return(<button className="btn btn-warning" onClick={this._onBlock}>Заблокировать доступ</button>);
        }
    }
    
    _onBlock = () => this.props.onBlock(this.props.id);
    _onUnblock = () => this.props.onUnblock(this.props.id);
}


class Users extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            users: [],
            isFetching: true
        };

        this.getUsers = this.getUsers.bind(this);
        this.onBlock = this.onBlock.bind(this);
        this.onUnblock = this.onUnblock.bind(this);
    }
    
    componentDidMount() {
        this.getUsers();
    }

    render() {
        return(
            <Container>
                {this.state.isFetching ? <LoadingScreen /> : <DataScreen users={this.state.users} refresh={this.getUsers} onBlock={this.onBlock} onUnblock={this.onUnblock} />}
                <Information />
            </Container>
        );
    }

    getUsers() {
        this.setState({
            isFetching: true
        });

        axios.get(this.props.basePrivateURL + '/myemployees',
            {
                auth: {
                    username: this.props.credentials.login,
                    password: this.props.credentials.password
                }
            }
        ).then((response) => {
            
            if (response.status === 200) {
                this.setState({
                    users: response.data, 
                    isFetching: false
                });
            }

        });
    }

    onBlock(id) {
        axios.get(this.props.basePrivateURL + `/myemployees/${id}/block`,
        {
            auth: {
                username: this.props.credentials.login,
                password: this.props.credentials.password
            }
        }
        ).then((response) => {
            if (response.status === 200) {
                this.getUsers();
            }
        });         
    }

    onUnblock(id) {
        axios.get(this.props.basePrivateURL + `/myemployees/${id}/unblock`,
        {
            auth: {
                username: this.props.credentials.login,
                password: this.props.credentials.password
            }
        }
        ).then((response) => {
            if (response.status === 200) {
                this.getUsers();
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

export default connect(mapStateToProps)(Users);
