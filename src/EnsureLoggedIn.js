import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


class EnsureLoggedInContainer extends Component {
    render() {
        return this.props.isLoggedIn ? this.props.children : <Redirect to="/login" />
    }
}
  
function mapStateToProps(state, ownProps) {
    return {
        isLoggedIn: state.loggedIn,
        currentURL: ownProps.location.pathname
    }
}

export default connect(mapStateToProps)(EnsureLoggedInContainer)