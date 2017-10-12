import React, { Component } from 'react';

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
        axios.get('https://devfresh.bit-live.ru/coreprivateapi/myapplications',
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

export default Users;
