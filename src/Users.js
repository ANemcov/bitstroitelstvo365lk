import React, { Component } from 'react';
import { connect } from 'react-redux';

var axios = require('axios');


class Users extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            applications: []
        };
      }
    
    componentDidMount() {
        /*
        axios.get(this.props.basePrivateURL + '/myapplications',
            {
                auth: {
                    username: 'Test03',
                    password: 'P@ssw0rd'
                }
            }
        ).then((response) => {
            
            if (response.status === 200) {
                this.setState({applications: response.data});
            }
    
        });
        */
    
      }



    render() {
        return null;

    }
}

const mapStateToProps = (state) => {
    return {
        basePrivateURL: state.basePrivateURL,
        credentials: state.credentials
    };
}

export default connect(mapStateToProps)(Users);
