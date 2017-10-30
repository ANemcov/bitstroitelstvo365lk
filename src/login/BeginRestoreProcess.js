import React, { Component } from 'react';
import { connect } from 'react-redux';

var axios = require('axios');

const BeginRestoreForm = (props) => 
<div className="card">
    <div className="header">
        <h4 className="title text-center">Запрос на изменение пароля</h4>
    </div>
    <div className="content">
        <form onSubmit={props.onSubmit}>
            <div className="row">
                <div className="col-md-12">
                    <p>
                        Укажите адрес почты, который был указан при регистрации. На этот адрес мы отправим уникальную ссылку для смены пароля.
                    </p>
                    <div className="form-group">
                        <input type="mail" className="form-control" placeholder="mail@mail.ru" required />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 text-center">
                    <button type="submit" className="btn btn-success btn-fill" disabled={props.inProgress}>Получить код восстановления</button>
                </div>
            </div>
        </form>
    </div>
</div>

class BeginRestoreProcess extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            mail: "",
            inProgress: false,
            success: false,
            error: false,
            errorText: "Неверный код активации"
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onMailChange = this.onMailChange.bind(this);
    }    

    render() {
        return (
                <BeginRestoreForm onSubmit={this.onSubmit}
                                onMailChange={this.onMailChange}
                                inProgress={this.state.inProgress}
                />
        );
    }

    onSubmit() {
    
    }

    onMailChange(e) {

    }
    
    
}

const mapStateToProps = (state) => {
    return {
        basePublicURL: state.basePublicURL,
    };
}

export default connect(mapStateToProps)(BeginRestoreProcess);