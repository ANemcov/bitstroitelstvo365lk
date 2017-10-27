import React, {Component} from 'react';
import { connect } from 'react-redux';
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


const LoadingScreen = () => 
<div className="card">
    <div className="header">
        <h1>Реквизиты компании</h1>
    </div>
    <div className="content">
        <div className="text-center"><i className="fa fa-refresh fa-spin fa-3x fa-fw"></i></div>
    </div>
</div>




const DataScreen = (props) => 
<div className="card">
    <div className="header">
        <h1>Реквизиты компании</h1>
        <p>Эта компания будет оплачивать сервис, и на эти реквизиты будут выставляться акты выполненных услуг.</p>
    </div>
    <div className="content">
        <form onSubmit={props.onSubmit}>
            <div className="row"><div className="col-md-6">
                <div className="form-group">
                    <label>Название юридического лица</label>
                    <input type="text" className="form-control" placeholder={"ООО \"Строительная Компания Орион\""} onChange={props.onLegalNameChange} defaultValue={props.company.LegalName} />
                </div>
            </div></div>
            <div className="row"><div className="col-md-6">
                <div className="form-group">
                    <label>ИНН</label>
                    <input type="text" className="form-control" placeholder="ИНН" onChange={props.onInnChange} defaultValue={props.company.INN} />
                </div>
            </div></div>
            <div className="row"><div className="col-md-6">
                <div className="form-group">
                    <label>КПП</label>
                    <input type="text" className="form-control" placeholder="КПП (если есть)" onChange={props.onKppChange} defaultValue={props.company.KPP} />
                </div>
            </div></div>

            <div className="row"><div className="col-md-6">
                <div className="form-group">
                    <label>Почтовый адрес (для отправки документов)</label>
                    <input type="text" className="form-control" placeholder="107126, Москва, ...." onChange={props.onMailingAddressChange} defaultValue={props.company.MailingAddress} />
                </div>
            </div></div>
            <div className="row"><div className="col-md-6">
                <button type="submit" className="btn btn-success btn-fill"><i className="fa fa-floppy-o"></i> Сохранить</button>
                <Posted show={props.posted} />
            </div></div>
        </form>
    </div>
</div>


const Posted = (props) => {
    return props.show ? <strong className="text-success"> Данные сохранены <i className="fa fa-check" aria-hidden="true"></i></strong> : null
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
            <Container>
            {this.state.isFetching ? <LoadingScreen /> : <DataScreen company={{INN: this.state.INN, KPP: this.state.KPP, LegalName: this.state.LegalName, MailingAddress: this.state.MailingAddress}} 
                                                                    onSubmit={this.onSubmit}
                                                                    onInnChange={this.onInnChange}
                                                                    onKppChange={this.onKppChange}
                                                                    onLegalNameChange={this.onLegalNameChange}
                                                                    onMailingAddressChange={this.onMailingAddressChange}
                                                                    posted={this.state.posted}                              
                                                                    />}
            </Container>
        );
    }

    onSubmit(e) {
        e.preventDefault();

        axios.get(this.props.basePrivateURL + '/finance/company/update',
        {
            auth: {
                username: this.props.credentials.login,
                password: this.props.credentials.password
            },
            params: {
                data: {
                    INN: this.state.INN,
                    KPP: this.state.KPP,
                    LegalName: this.state.LegalName,
                    MailingAddress: this.state.MailingAddress
                }
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
        basePrivateURL: state.basePrivateURL,
        credentials: state.credentials
    }
}

export default connect(mapStateToProps)(Profile)