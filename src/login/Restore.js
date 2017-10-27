import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Wrapper from '../common/SingleColumnWrapper.js'

var axios = require('axios');

const RestoreForm = (props) => 
<div className="card">
    <div className="header">
        <h4 className="title">Личный кабинет БИТ.Строительство 365</h4>
    </div>
    <div className="content">
        <form onSubmit={props.onSubmit}>
            <div className="row">
                <div className="col-md-3">
                    <div className="form-group">
                        <label>Электронная почта</label>
                        <input type="mail" className="form-control" placeholder="Username" />
                    </div>
                </div>
            </div>
            <div className="row">
                <button type="submit" className="btn btn-info btn-fill">Получить код восстановления</button>
            </div>
        </form>
    </div>
</div>


const UpdateForm = (props) => 
<div className="card">
    <div className="content">
        <form onSubmit={props.onSubmit}>
            <div className="row">
                <div className="col-md-3">
                    <div className="form-group">
                        <label>Код восстановления</label>
                        <input type="text" className="form-control" placeholder="code" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3">
                    <div className="form-group">
                        <label>Новый пароль</label>
                        <input type="password" className="form-control" placeholder="code" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3">
                    <div className="form-group">
                        <label>Новый пароль (повтор)</label>
                        <input type="password" className="form-control" placeholder="code" />
                    </div>
                </div>
            </div>
            <div className="row">
                <button type="submit" className="btn btn-info btn-fill">Установить пароль</button>
            </div>
        </form>
    </div>
</div>



class Restore extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        let {isLoginPending, isLoginSuccess, loginError} = this.props;

        if (isLoginPending) {
            return (
                <div>Please wait...</div>
            )
        } else if (isLoginSuccess) {
            return (
                <Redirect to={'/'} />
            )
        } else {
            return (
                <Wrapper>
                    <RestoreForm onSubmit={this.onSubmit} />
                    { loginError && <div>{loginError}</div> }
                    <UpdateForm />
                </Wrapper>);
        }

    }

    onSubmit(e) {
        e.preventDefault();
        
        this.beginRestore();

    }

    beginRestore(username, password) {
        

    }    

}

const mapStateToProps = (state) => {
    return {
        basePublicURL: state.basePublicURL

    };
}



export default connect(mapStateToProps)(Restore);
