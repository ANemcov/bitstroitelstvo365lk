import React, { Component } from 'react';
import { connect } from 'react-redux';

var axios = require('axios');

class Price extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            price: 0,
            isFetching: true
        };
    }
    
    componentDidMount() {
        this.getPrice(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.getPrice(nextProps);
    }     

    render() {
        return(
            this.state.isFetching ? null : <span>{this.state.price}</span> 
        );
    }

    getPrice(props) {
        
        axios.get(props.basePublicURL + `/tariffs/${props.id}/quote`,
        {
            params: {
                data: {
                    modules: props.modules,
                    options: props.options,
                    nusers: props.nusers
                }
            },
            headers: {
                'Cache-Control': 'no-cache,no-store,must-revalidate,max-age=-1,private',
                'Pragma': 'no-cache',
                'Expires': '-1'
            }
        }).then((response) => {
            if (response.status === 200) {
                this.setState({
                    price: response.data.Cost, 
                    isFetching: false
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

export default connect(mapStateToProps)(Price);