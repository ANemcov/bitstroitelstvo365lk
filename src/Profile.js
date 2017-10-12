import React, {Component} from 'react';
import { connect } from 'react-redux';
var axios = require('axios');

class Profile extends Component {
    render() {
        null

    }
}
  
function mapStateToProps(state, ownProps) {
    return {
        credentials: state.credentials
    }
}

export default connect(mapStateToProps)(Profile)