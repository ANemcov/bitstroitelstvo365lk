import React, {Component} from 'react';
import { connect } from 'react-redux';
import GetInvoice from './GetInvoice.js';
var axios = require('axios');

const Container = (props) =>
<div className="card">
    <div className="header">
        <h1>Текущий баланс</h1>
    </div>
    <div className="content">
        <div className="row">
            {props.children}
        </div>
    </div>
</div>


const LoadingScreen = () => 
<div className="text-center"><i className="fa fa-refresh fa-spin fa-3x fa-fw"></i></div>

const DataScreen = (props) => 
<p>
    <h4><strong>Баланс: {props.balance.toLocaleString('ru-RU')} руб.</strong></h4>
    Следующее списание: {props.nextWriteoffDate}
</p>


class Balance extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            balance: 0,
            nextWriteoffDate: "",
            isFetching: true
        };
    }
    
    componentDidMount() {

        this.setState({isFetching: true});

        axios.get(this.props.basePrivateURL + '/finance/balance',
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
                this.setState({
                    balance: response.data.Balance, 
                    nextWriteoffDate: response.data.NextWriteoffDate,
                    isFetching: false
                });
            }
    
        });
    
    }

    render() {
        return(
            <Container>
                <div className="col-md-4">
                    {this.state.isFetching ? <LoadingScreen /> : <DataScreen    balance={this.state.balance}
                                                                                nextWriteoffDate={this.state.nextWriteoffDate}
                                                                                />}
                </div>
                <div className="col-md-8">
                    <GetInvoice />
                </div>
            </Container>
        );
    }
}
  
function mapStateToProps(state) {
    return {
        basePrivateURL: state.basePrivateURL,
        credentials: state.credentials
    }
}

export default connect(mapStateToProps)(Balance)