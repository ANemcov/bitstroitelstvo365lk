import React, { Component } from 'react';
import { connect } from 'react-redux';

var axios = require('axios');

class CreateTestBase extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            available: true,
            inProgress: false,
            success: false
        };
    }
    
    render() {
        return(
            <div className="content">
                <p className="text-center">Создать бесплатную тестовую базу с полным функционалом</p>
                <p className="text-center"><small>на 15 дней</small></p>
                <div className="text-center" style={{ width: "100%", left: 0, bottom: 30, position: "absolute"}}>
                    {this.state.success ? <strong className="text-success"><i className="fa fa-check" aria-hidden="true"></i> База создана</strong> : <button className="btn btn-success btn-fill" onClick={this.createbase} disabled={this.state.inProgress || !this.state.available}>Создать тестовую базу</button>}
                </div>
            </div>
        );
    }

    createbase = () => {
        this.setState({inProgress: true});
        
        axios.get(this.props.basePrivateURL + '/mytariffs/addtest',
        {
            auth: {
                username: this.props.credentials.login,
                password: this.props.credentials.password
            }
        }        
        ).then((response) => {
            if (response.status === 200) {
                this.setState({
                    available: false, 
                    inProgress: false,
                    success: true
                });
                this.props.onCreate();
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

export default connect(mapStateToProps)(CreateTestBase);