import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
var axios = require('axios');

const EditForm = (props) => 
<div className="main-panel">
    <div className="content">
        <div className="card">
            <div className="header">
                <h1>
                    <Link to="/tariffs">
                        <button className="btn btn-warning btn-fill"><i className="fa fa-arrow-circle-left"></i> Назад</button>
                    </Link>
                    Изменение тарифа
                </h1>
            </div>
            <div className="content">
                <div className="row">
                    <div className="col-md-4">
                        {props.tariff.App.Name}
                    </div>
                    <div className="col-md-4">
                        {props.tariff.Tariff.Name}
                    </div>
                    <div className="col-md-4">
                        {props.tariff.Nusers}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>



class EditMyTariff extends Component {

    render() {
        const tariff = this.props.location.state.tariff;


        return(
            <EditForm tariff={tariff} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        credentials: state.credentials
    };
}


export default connect(mapStateToProps)(EditMyTariff);
