import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
var axios = require('axios');

const Container = (props) =>
<div className="main-panel">
    <div className="content">
        <div className="container-fluid">
            <div className="row">
                {props.children}
            </div>
        </div>
    </div>
</div>

class StopMyTariff extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            mytariff: this.props.location.state.mytariff,
            inProgress: false,
            success: false,
            error: false,
            errorText: ""  
        };

      }
    
    render() {
        return(
            <Container>
                <div className="card">
                    <div className="header">
                        <h1>Отключение тарифа</h1>
                    </div>
                    <div className="content">
                        <div className="row">
                            <div className="col-md-6">
                                <p>Тариф будет отключен и база более не будет доступна.</p>
                                <p className='text-center'>Вы уверены?</p>
                                <p>
                                    <Link to="/tariffs">
                                        <button className="btn btn-warning btn-fill"><i className="fa fa-arrow-circle-left"></i> Назад</button>
                                    </Link>                                    
                                    {this.state.inProgress && <StopInProgress />}
                                    {this.state.success && <StopSuccessful />}
                                    {this.state.error && <StopError errorText={this.state.errorText} />}
                                    {(!this.state.error && !this.state.inProgress && !this.state.success) && <button className='btn btn-danger btn-fill pull-right' onClick={this.stopTariff}>Отключить</button>}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        );
    }

    stopTariff = () => {
        this.setState({inProgress: true});
        
        axios.get(this.props.basePrivateURL + `/mytariffs/${this.state.mytariff.Tariff.Id}/${this.state.mytariff.App.Id}/stop`,
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

                if (response.data.Error) {
                    this.setState({
                        inProgress: false,
                        success: false,
                        error: true,
                        errorText: response.data.Error
                    });
                } else {
                    this.setState({
                        inProgress: false,
                        success: true,
                        error: false
                    });
                }
            }

        })
        .catch((error) => {
            
            if (error.response) {
                this.setState({
                    inProgress: false,
                    success: false,
                    error: true,
                    errorText: error.response.data
                });
            } else {
                this.setState({
                    inProgress: false,
                    success: false,
                    error: true,
                    text: error.message
                });
            }

        });      
    }  
}

const StopInProgress = (props) => 
<div className="text-center">
    <i className="fa fa-refresh fa-spin fa-3x fa-fw"></i>
</div>


const StopSuccessful = (props) => 
<div className="text-center">
    <p className="text-success"><strong>
        <i className="fa fa-check" aria-hidden="true"></i> Тариф отключен
    </strong></p>
</div>

const StopError = (props) => 
<div className="text-center">
    <p className="text-danger"><strong>
        Произошла ошибка: {props.errorText}
    </strong></p>
    <p>
        Чтобы разобраться с ошибкой напишите нам на почту <a href="mailto:support@bit-stroitelstvo.ru">support@bit-stroitelstvo.ru</a> с адреса, который был указан при регистрации.
    </p>
</div>

function mapStateToProps(state) {
    return {
        basePrivateURL: state.basePrivateURL,
        credentials: state.credentials
    }
}

export default connect(mapStateToProps)(StopMyTariff)