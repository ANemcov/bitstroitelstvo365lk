import React, { Component } from 'react';
import MyTariffs from './tariffs/MyTariffs.js';
import AvailableTariffs from './tariffs/AvailableTariffs.js';

class Tariffs extends Component {
    render() {
        return (
            <div className="main-panel">
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <MyTariffs />
                        </div>
                        <div className="row">
                            <AvailableTariffs />
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default Tariffs;
