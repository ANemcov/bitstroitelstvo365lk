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
<h2><i className="pe-7s-refresh-2"></i> Загрузка...</h2>

const DataScreen = (props) => 
<p>
    <h4><strong>Баланс: {props.balance} руб.</strong></h4>
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

        axios.get('https://devfresh.bit-live.ru/coreprivateapi/finance/balance',
            {
                auth: {
                    username: this.props.credentials.login,
                    password: this.props.credentials.password
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
        credentials: state.credentials
    }
}

export default connect(mapStateToProps)(Balance)