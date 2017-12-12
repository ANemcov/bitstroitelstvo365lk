import React, { Component } from 'react';

import Wrapper from './common/SingleColumnWrapper.js'

class MobileUnAvailable extends Component {
    render() {
        return (
            <Wrapper>
                <div className="card">
                    <div className="header">
                        <h4 className="title text-center">Нужно заходить с компьютера</h4>
                    </div>
                    <div className="content">
                        <p className="text-center">
                            Основная работа с системой предполагает наличие экрана размера не менее 14' 
                        </p>
                    </div>
                </div>
            </Wrapper>
        );
    }

}

export default MobileUnAvailable;
