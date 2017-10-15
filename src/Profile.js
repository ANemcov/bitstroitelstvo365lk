import React, {Component} from 'react';
import { connect } from 'react-redux';
var axios = require('axios');

const LoadingScreen = () => 
    <div className="main-panel">
        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="card">
                        <div className="header">
                            <h1>Реквизиты компании</h1>
                        </div>
                        <div className="content">
                            <h2><i className="pe-7s-refresh-2"></i> Загрузка...</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

const DataScreen = (props) => 
    <div className="main-panel">
        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="card">
                        <div className="header">
                            <h1>Реквизиты компании</h1>
                        </div>
                        <div className="content">
                            <form onSubmit={props.onSubmit}>
                                <div className="row">
                                    <div className="form-group">
                                        <label>Название юридического лица</label>
                                        <input type="text" className="form-control" placeholder="LegalName" onChange={props.onLegalNameChange} defaultValue={props.company.LegalName} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group">
                                        <label>ИНН</label>
                                        <input type="text" className="form-control" placeholder="INN" onChange={props.onInnChange} defaultValue={props.company.INN} />
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="form-group">
                                        <label>КПП</label>
                                        <input type="text" className="form-control" placeholder="KPP" onChange={props.onKppChange} defaultValue={props.company.KPP} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-group">
                                        <label>Почтовый адрес (для отправки документов)</label>
                                        <input type="text" className="form-control" placeholder="MailingAddress" onChange={props.onMailingAddressChange} defaultValue={props.company.MailingAddress} />
                                    </div>
                                </div>
                                <div className="row">
                                    <button type="submit" className="btn btn-success btn-fill">Сохранить</button>
                                    <Posted show={props.posted} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

const Posted = (props) => {
    return props.show ? <span>Сохранено</span> : null
}


class Profile extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            INN: "",
            KPP: "",
            LegalName: "",
            MailingAddress: "",
            isFetching: true,
            posted: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onInnChange = this.onInnChange.bind(this);
        this.onKppChange = this.onKppChange.bind(this);
        this.onLegalNameChange = this.onLegalNameChange.bind(this);
        this.onMailingAddressChange = this.onMailingAddressChange.bind(this);
      }
    
    componentDidMount() {

        axios.get('https://devfresh.bit-live.ru/coreprivateapi/finance/company',
            {
                auth: {
                    username: this.props.credentials.login,
                    password: this.props.credentials.password
                }
            }
        ).then((response) => {
            
            if (response.status === 200) {
                this.setState({
                    INN: response.data.INN,
                    KPP: response.data.KPP,
                    LegalName: response.data.LegalName,
                    MailingAddress: response.data.MailingAddress, 
                    isFetching: false
                });
            }
    
        });
    
    }

    render() {
        return(
            this.state.isFetching ? <LoadingScreen /> : <DataScreen company={{INN: this.state.INN, KPP: this.state.KPP, LegalName: this.state.LegalName, MailingAddress: this.state.MailingAddress}} 
                                                                    onSubmit={this.onSubmit}
                                                                    onInnChange={this.onInnChange}
                                                                    onKppChange={this.onKppChange}
                                                                    onLegalNameChange={this.onLegalNameChange}
                                                                    onMailingAddressChange={this.onMailingAddressChange}
                                                                    posted={this.state.posted}                              
                                                                    />
        );
    }

    onSubmit(e) {
        e.preventDefault();

        axios.post('https://devfresh.bit-live.ru/coreprivateapi/finance/company/update',
        {
            auth: {
                username: this.props.credentials.login,
                password: this.props.credentials.password
            },
            data: {
                INN: this.state.INN,
                KPP: this.state.KPP,
                LegalName: this.state.LegalName,
                MailingAddress: this.state.MailingAddress
            }
        }
        ).then((response) => {
            
            if (response.status === 200) {

                this.setState({posted: true});

            }

        });        


    }
    onInnChange(e) {
        this.setState({INN: e.target.value});
    }
    onKppChange(e) {
        this.setState({KPP: e.target.value});
    }    
    onLegalNameChange(e) {
        this.setState({LegalName: e.target.value});
    }
    onMailingAddressChange(e) {
        this.setState({MailingAddress: e.target.value});
    }

}
  
function mapStateToProps(state) {
    return {
        credentials: state.credentials
    }
}

export default connect(mapStateToProps)(Profile)