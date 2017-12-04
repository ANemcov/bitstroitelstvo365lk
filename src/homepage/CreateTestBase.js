import React, { Component } from 'react';
import { connect } from 'react-redux';

var axios = require('axios');

class CreateTestBase extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            available: true,
            inProgress: false,
            success: false,
            showNotification: false
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
                {this.state.showNotification ? <Notification onClose={this.closeNotification} /> : null}
            </div>
        );
    }

    closeNotification = () => this.setState({showNotification: false})

    createbase = () => {
        this.setState({inProgress: true});
        
        axios.get(this.props.basePrivateURL + '/mytariffs/addtest',
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
                    available: false, 
                    inProgress: false,
                    success: true,
                    showNotification: true
                });
                this.props.onCreate();
            }
        });
    }
}

const Notification = (props) => 
<div className="global-alert-top-right">
    <div className="alert alert-warning alert-with-icon">
        <button type="button" aria-hidden="true" className="close" onClick={props.onClose}>×</button>
        <span data-notify="icon" className="pe-7s-bell"></span>
        <span><strong>База создана. В списке приложений появилась ссылка для входа в базу</strong></span>
    </div>
</div>
    
const mapStateToProps = (state) => {
    return {
        basePrivateURL: state.basePrivateURL,
        credentials: state.credentials
    };
}

export default connect(mapStateToProps)(CreateTestBase);