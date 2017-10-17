import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import SingleTariffForm from './SingleTariffForm.js';
var axios = require('axios');

const EditForm = (props) => 
<div className="main-panel">
    <div className="content">
        <div className="card">
            <div className="header">
                <h1>Изменение тарифа</h1>
            </div>
            <div className="content">
                <SingleTariffForm mytariff={props.tariff} />

                <div className="row">
                    <div className="col-md-6">
                        <Link to="/tariffs">
                            <button className="btn btn-warning btn-fill"><i className="fa fa-arrow-circle-left"></i> Назад</button>
                        </Link>
                        <button className="btn btn-success btn-fill pull-right"><i className="fa fa-floppy-o"></i> Сохранить</button>
                        <button className="btn btn-danger btn-fill pull-right"><i className="fa fa-ban"></i> Отключить</button>
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
