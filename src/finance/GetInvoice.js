import React, {Component} from 'react';
import { connect } from 'react-redux';
var axios = require('axios');


const Posted = (props) => {
    return props.show ? <strong className="text-success"> Счет отправлен <i className="fa fa-check" aria-hidden="true"></i></strong> : null
}


class GetInvoice extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            email: "",
            amount: 0,
            posted: false
        };

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onAmountChange = this.onAmountChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }
    
    render() {
        return(<div>
            <div className="row">
                <div className="col-md-8">
                    <h4>Самостоятельное выставление счета на оплату</h4>
                </div>
            </div>
            <form onSubmit={this.onSubmit}>

                <div className="row flex-row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Адрес эл. почты</label>
                            <input type="email" className="form-control" placeholder="yourmail@yourdomain.com" onChange={this.onEmailChange} />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label>Сумма</label>
                            <div className="input-group">
                                <input type="number" className="form-control" onChange={this.onAmountChange} />
                                <div className="input-group-addon">.00</div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-2 flex-bottom">
                        <div className="form-group">
                            <button type="submit" className="btn btn-success btn-fill"><i className="fa fa-envelope-o"></i> Получить</button>
                            <Posted show={this.state.posted} />
                        </div>
                    </div>
                </div>
            </form>
        </div>);
    }

    onSubmit(e) {
        e.preventDefault();

        axios.get('https://devfresh.bit-live.ru/privateapi/hs/coreprivateapi/finance/company/update',
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

    onEmailChange(e) {
        this.setState({email: e.target.value});
    }
    onAmountChange(e) {
        this.setState({amount: e.target.value});
    }
}
  
function mapStateToProps(state) {
    return {
        credentials: state.credentials
    }
}

export default connect(mapStateToProps)(GetInvoice)