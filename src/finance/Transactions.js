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
<div>
    <i className="fa fa-refresh fa-spin fa-3x fa-fw"></i>
</div>

const DataScreen = (props) =>
<div>
    <p>{JSON.stringify(props.transactions)}</p>
    <table className="table table-condensed">
        <thead>
            <tr>
                <th>Операция</th>
                <th>Приход</th>
                <th>Расход</th>
            </tr>
        </thead>
    </table>
</div>


class Transactions extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            dateFrom: new Date().toISOString(),
            dateTo: new Date().toISOString(),
            isFetching: true,
            transactions: []
        };

        this.getTransactions = this.getTransactions.bind(this);

    }
    
    componentDidMount() {
        this.getTransactions();
    }    

    render() {
        return (
            <Container>
                <div className="row">
                    <div className="col-md-8">
                        {"с "}<input type="date" className="form-control" onChange={this.handleFromDayChange} />
                        {"по "}<input type="date" className="form-control" onChange={this.handleToDayChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        {this.state.isFetching ? <LoadingScreen /> : <DataScreen transactions={this.state.transactions} />}
                    </div>
                </div>
            </Container>
        );

    }

    //handleFromDayChange = (selectedDay, modifiers) => this.setState({dateFrom : selectedDay._i.toISOString()});
    //handleToDayChange = (selectedDay, modifiers) => this.setState({dateTo : selectedDay._i.toISOString()});

    handleFromDayChange = (e) => this.setState({dateFrom : e.target.value});
    handleToDayChange = (e) => this.setState({dateTo : e.target.value});
    

    getTransactions() {
        
        this.setState({
            isFetching: true
        });

        //https://devfresh.bit-live.ru/coreprivateapi/finance/transactions?from=2017-09-30T16:30:00.000&to=2017-10-18T16:30:00.000
        axios.get('https://devfresh.bit-live.ru/coreprivateapi/finance/transactions',
            {
                auth: {
                    username: this.props.credentials.login,
                    password: this.props.credentials.password
                },
                params: {
                    from: this.state.dateFrom,
                    to: this.state.dateTo
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
        credentials: state.credentials
    };
}

export default connect(mapStateToProps)(Transactions);