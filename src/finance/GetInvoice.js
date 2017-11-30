import React, {Component} from 'react';
import { connect } from 'react-redux';
var axios = require('axios');


const Posted = (props) => {
    return props.show ? <strong className="text-success"><i className="fa fa-check" aria-hidden="true"></i> Счет отправлен</strong> : null
}
const FormError = (props) => {
    return props.show ? <strong className="text-danger"><i className="fa fa-exclamation" aria-hidden="true"></i> Заполните оба поля выше</strong> : null
}

class GetInvoice extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            email: "",
            amount: 0,
            posted: false,
            formError: false
        };

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onAmountChange = this.onAmountChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    render() {
        return(<div>
            <div className="row">
                <div className="col-md-8">
                    <h4>Самостоятельное получение счета на оплату</h4>
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
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <div className="pull-right">
                            <FormError show={this.state.formError} />
                            <Posted show={this.state.posted} />
                        </div>
                    </div>
                </div>
            </form>

            
        </div>);
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.state.amount === 0 || this.state.email.trim === "") {
            this.setState({formError: true});
            return;
        }

        axios.get(this.props.basePrivateURL + '/finance/sendinvoice',
        {
            auth: {
                username: this.props.credentials.login,
                password: this.props.credentials.password
            },
            params: {
                data: {
                    mail: this.state.email,
                    amount: this.state.amount
                }
            },
            headers: {
                'Cache-Control': 'no-cache,no-store,must-revalidate,max-age=-1,private',
                'Pragma': 'no-cache',
                'Expires': '-1'
            }
        }
        ).then((response) => {
            
            if (response.status === 200) {

                this.setState({posted: true, formError: false});

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
        basePrivateURL: state.basePrivateURL,
        credentials: state.credentials
    }
}

export default connect(mapStateToProps)(GetInvoice)