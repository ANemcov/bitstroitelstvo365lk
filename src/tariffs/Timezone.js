import React, { Component } from 'react';
import { connect } from 'react-redux';

var axios = require('axios');

class Timezone extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            allzones: []
        };
    }
    
    componentDidMount() {
        this.getTimezones(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.getTimezones(nextProps);
    }     

    render() {
        return(
            <select className="form-control" onChange={this.props.onChange} defaultValue={this.props.value ? this.props.value : "Europe/Moscow"}>
               {this.state.allzones.map((elem,index) => <option key={index} value={elem.key}>{elem.value}</option>)}
            </select>
        );
    }

    getTimezones(props) {
        
        axios.get(props.basePublicURL + '/timezones',
        {
            headers: {
                'Cache-Control': 'no-cache,no-store,must-revalidate,max-age=-1,private',
                'Pragma': 'no-cache',
                'Expires': '-1'
            }
        })
        .then((response) => {
            if (response.status === 200) {

                let allzones = response.data.map(elem => {
                    let key = Object.keys(elem)[0];
                    let value = elem[key];
                    return {key: key, value: value}
                });


                this.setState({
                    allzones: allzones
                });
            }
        });

    }
}
    
const mapStateToProps = (state) => {
    return {
        basePublicURL: state.basePublicURL
    };
}

export default connect(mapStateToProps)(Timezone);