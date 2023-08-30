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
                        <input type="email" className="form-control" placeholder="mail@mail.ru" required onChange={props.onMailChange} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 text-center">
                    <button type="submit" className="btn btn-success btn-fill" disabled={props.inProgress}>Получить код восстановления</button>
                    {props.inProgress ? <ActivationInProgress /> : null}
                    {props.success ? <ActivationSuccessful /> : null}
                    {props.error ? <ActivationError errorText={props.errorText} /> : null}
                </div>
            </div>
        </form>
    </div>
</div>

const ActivationInProgress = (props) => 
<div className="text-center">
    <i className="fa fa-refresh fa-spin fa-3x fa-fw"/>
</div>


const ActivationSuccessful = (props) => 
<p className="content text-center text-success">
    <strong>
        <i className="fa fa-check" aria-hidden="true"/> Письмо с кодом для смены пароля отправлено
    </strong>
</p>


const ActivationError = (props) => 
<div className="content">
    <p className="text-center text-danger">
        <strong>
            Произошла ошибка: {props.errorText}
        </strong>
    </p>
    <p>
        Чтобы разобраться с ошибкой напишите на почту <a href="mailto:support@bit-stroitelstvo.ru">support@bit-stroitelstvo.ru</a> с адреса, который был указан при регистрации.
    </p>
</div>



class BeginRestoreProcess extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            mail: "",
            inProgress: false,
            success: false,
            error: false,
            errorText: "Адрес не найден"
        }

        this.onSubmit = this.onSubmit.bind(this);
    }    

    render() {
        return (
                <BeginRestoreForm onSubmit={this.onSubmit}
                                onMailChange={this.onMailChange}
                                inProgress={this.state.inProgress}
                                success={this.state.success}
                                error={this.state.error}
                                errorText={this.state.errorText}
                />
        );
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({inProgress: true});
        
        axios.get(this.props.basePublicURL + '/account/password/restore/' + this.state.mail,
        {
            headers: {
                'Cache-Control': 'no-cache,no-store,must-revalidate,max-age=-1,private',
                'Pragma': 'no-cache',
                'Expires': '-1'
            }
        }
        ).then((response) => {
            this.setState({
                inProgress: false,
                success: true,
                error: false
            });
        })
        .catch((error) => {
            this.setState({
                inProgress: false,
                success: false,
                error: true,
                errorText: error.response === undefined ? "ошибка соединения" : error.response.data
            });
        });
    }

    onMailChange = (e) => {this.setState({mail: e.target.value})}
    
    
}

const mapStateToProps = (state) => {
    return {
        basePublicURL: state.basePublicURL,
    };
}

export default connect(mapStateToProps)(BeginRestoreProcess);