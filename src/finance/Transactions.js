import React, { Component } from 'react';
import { connect } from 'react-redux';

var axios = require('axios');


const Container = (props) =>
<div className="card">
    <div className="header">
        <h1>Финансовые операции</h1>
    </div>
    <div className="content">
        {props.children}
    </div>
</div>

const LoadingScreen = (props) =>
<div className="text-center">
    <i className="fa fa-refresh fa-spin fa-3x fa-fw"></i>
</div>

const DataScreen = (props) =>
<div>
    <table className="table table-condensed">
        <thead>
            <tr>
                <th>Операция</th>
                <th>Приход</th>
                <th>Расход</th>
            </tr>
        </thead>
        <tbody>
            <tr className="active">
                <td>На начало периода</td>
                <td colSpan={2} className="text-center">{props.data.startingbalance.amount}</td>
            </tr>
            {props.data.transactions.map(elem => 
                <tr>
                    <td>{elem.description}</td>
                    <td>{elem.accrual > 0 ? elem.accrual : ""}</td>
                    <td>{elem.writeoff > 0 ? elem.writeoff : ""}</td>
                </tr>
            )}
            <tr className="active">
                <td>На конец периода</td>
                <td colSpan={2} className="text-center">{props.data.endingbalance.amount}</td>
            </tr>
        </tbody>
    </table>
</div>


class Transactions extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            dateFrom: new Date().toISOString(),
            dateTo: new Date().toISOString(),
            isFetching: false,
            transactions: []
        };

        this.getTransactions = this.getTransactions.bind(this);

    }
    
    componentDidMount() {
        //this.getTransactions();
    }    

    render() {
        return (
            <Container>
                <div className="row">
                    <div className="col-md-8 form-inline">
                        <div className="form-group">
                            <label>{"За период"}</label>
                            <input type="date" className="form-control" onChange={this.handleFromDayChange} />
                        </div>
                        <div className="form-group">
                            <label>{"по"}</label>
                            <input type="date" className="form-control" onChange={this.handleToDayChange} />
                        </div>
                        <button className="btn btn-success btn-fill" onClick={this.getTransactions}><i className="fa fa-cloud-download" aria-hidden="true"></i> Показать</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        {this.state.isFetching && <LoadingScreen />} 
                        {this.state.transactions.length === 0 ? null : <DataScreen data={this.state.transactions} />}
                    </div>
                </div>
            </Container>
        );

    }

    handleFromDayChange = (e) => this.setState({dateFrom : e.target.value + "T00:00:00"});
    handleToDayChange = (e) => this.setState({dateTo : e.target.value + "T23:59:59"});
    

    getTransactions() {
        
        this.setState({
            isFetching: true
        });

        axios.get(this.props.basePrivateURL + '/finance/transactions',
            {
                auth: {
                    username: this.props.credentials.login,
                    password: this.props.credentials.password
                },
                params: {
                    from: this.state.dateFrom,
                    to: this.state.dateTo
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
                    transactions: response.data, 
                    isFetching: false
                });
            }

        });
    }    


}

const mapStateToProps = (state) => {
    return {
        basePrivateURL: state.basePrivateURL,
        credentials: state.credentials
    };
}

export default connect(mapStateToProps)(Transactions);