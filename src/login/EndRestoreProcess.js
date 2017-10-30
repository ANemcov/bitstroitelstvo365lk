import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

var axios = require('axios');

const SerPasswordForm = (props) => 
<div className="card">
    <div className="header">
        <h4 className="title text-center">Изменение пароля</h4>
    </div>
    <div className="content">
        <form onSubmit={props.onSubmit}>
            <div className="row">
                <div className="col-md-12">
                    <p>Введите полученный письмом код восстановления и новый пароль.</p>
                    <div className="form-group">
                        <label>Код восстановления</label>
                        <input type="text" className="form-control" placeholder="7105ba28-9e69-40b6-b231-d892ed3b8cdf" required onChange={props.onCodeChange} value={props.code} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                        <label>Новый пароль</label>
                        <input type="password" className="form-control" placeholder="новый пароль" aria-describedby="helpBlockPassword" required pattern="[0-9a-zA-Z!@#$%^*(){};:]{7,}" />
                        <p id="helpBlockPassword" className="help-block"><small>Не менее 7 символов: латинские буквы, цифры, спецсимволы</small></p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                        <label>Новый пароль (повтор)</label>
                        <input type="password" className="form-control" placeholder="новый пароль" required />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 text-center">
                    <button type="submit" className="btn btn-success btn-fill">Установить пароль</button>
                </div>
            </div>
        </form>
    </div>
</div>


class EndRestoreProcess extends Component {
    constructor(props) {
        super(props);

        this.state = {
            code: props.code,
            inProgress: false,
            success: false,
            error: false,
            errorText: "Неверный код активации"
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onCodeChange = this.onCodeChange.bind(this);
    }   
    
    componentWillReceiveProps(nextProps) {
        this.setState({code: nextProps.code});
    } 
    
    render() {
        return (
                <SerPasswordForm onSubmit={this.onSubmit}
                                onCodeChange={this.onCodeChange}
                                inProgress={this.state.inProgress}
                                code={this.state.code}
                />
        );
    }

    onSubmit() {
    
    }

    onCodeChange(e) {
        this.setState({code: e.target.value});
    }   

}

const mapStateToProps = (state) => {
    return {
        basePublicURL: state.basePublicURL,
    };
}

export default connect(mapStateToProps)(EndRestoreProcess);