import React, { Component } from 'react';
import { connect } from 'react-redux';
var axios = require('axios');

const LoadingScreen = () => 
    <div className="main-panel">
        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="card">
                        <div className="header">
                            <h1>Ваши приложения</h1>
                        </div>
                        <div className="content">
                            <h2><i className="pe-7s-refresh-2"></i> Загрузка...</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>




const DataScreen = (props) => 
    <div className="main-panel">
        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="card">
                        <div className="header">
                            <h1>Ваши приложения</h1>
                        </div>
                        <div className="content">
                            {props.apps.map(app => <SingleApp app={app} key={app.Id} />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


const SingleApp = (props) => 
    <div className="row">
        <div className="col-md-5">
            {props.app.Name}
            <small>
                {" (" + props.app.ConfigName + " " + props.app.ConfigVersionName + ")"}
            </small>
        </div>
        <div className="col-md-2">
            {props.app.Status}
        </div>
        <div className="col-md-5">
            <a href={props.app.URLWithCredentials} target="_blank">{props.app.URL}</a>
        </div>
    </div>



class Homepage extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            applications: [],
            isFetching: true
        };
      }
    
    componentDidMount() {

        axios.get('https://devfresh.bit-live.ru/coreprivateapi/myapplications',
            {
                auth: {
                    username: this.props.credentials.login,
                    password: this.props.credentials.password
                }
            }
        ).then((response) => {
            
            if (response.status === 200) {
                this.setState({
                    applications: response.data, 
                    isFetching: false
                });
            }
    
        });
    
    }

    render() {
        return(
            this.state.isFetching ? <LoadingScreen /> : <DataScreen apps={this.state.applications} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        credentials: state.credentials
    };
}

export default connect(mapStateToProps)(Homepage);
