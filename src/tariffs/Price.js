import React, { Component } from 'react';
import { connect } from 'react-redux';

var axios = require('axios');


const DataScreen = (props) =>
    <span>
        Цена: {props.price}
    </span>


class Price extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            price: 0,
            isFetching: true
        };
      }
    
    componentDidMount() {
        
        axios.get(`https://devfresh.bit-live.ru/corepublicapi/tariffs/${this.props.id}/quote`,
        {
            params: {
                data: {
                    modules: this.props.modules.map(elem => elem["Id"]),
                    options: this.props.options.map(elem => elem["Id"]),
                    nusers: this.props.nusers
                }
            }
        }
        ).then((response) => {
            
            if (response.status === 200) {
                this.setState({
                    price: response.data.Cost, 
                    isFetching: false
                });
            }
    
        });
    
    }

    render() {
        return(
            this.state.isFetching ? null : <span>{this.state.price}</span> 
        );
    }
}
    
const mapStateToProps = (state) => {
    return {
        credentials: state.credentials
    };
}
    
    
export default connect(mapStateToProps)(Price);