import React, { Component } from 'react';

const Container = (props) =>
<div className="card">
    <div className="header">
        <h1>Финансовые операции</h1>
    </div>
    <div className="content">
        {props.children}
    </div>
</div>


class Transactions extends Component {
    render() {
        return (
            <Container>
                <div className="row">
                </div>
            </Container>
        );

    }
}

export default Transactions;
