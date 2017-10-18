import React, { Component } from 'react';
import Balance from './Balance.js';
import Transactions from './Transactions.js';

class Finance extends Component {
    render() {
        return (
            <div className="main-panel">
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <Balance />
                        </div>
                        <div className="row">
                            <Transactions />
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default Finance;
