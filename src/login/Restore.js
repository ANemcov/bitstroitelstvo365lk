import React, { Component } from 'react';

import Wrapper from '../common/SingleColumnWrapper.js';
import BeginRestoreProcess from './BeginRestoreProcess.js';
import EndRestoreProcess from './EndRestoreProcess.js';

class Restore extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            code: ""
        }
    }

    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        const code = params.get('code');

        if (code != null) { 
            this.setState({code: code}); 
        }
    }

    render() {
        return (
            <Wrapper>
                {(this.state.code === "") && <BeginRestoreProcess />}
                <EndRestoreProcess code={this.state.code} />
            </Wrapper>);
    }
}

export default Restore;
