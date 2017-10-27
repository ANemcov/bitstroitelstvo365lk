import React, { Component } from 'react';

const SingleColumnWrapper = (props) => 
<div className="container-fluid">
    <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
            <Header />
            {props.children}
        </div>
        <div className="col-md-4"></div>
    </div>
</div>

const Header = () =>
<div style={{marginTop: "50px", marginBottom: "20px"}}>
    <div className="header">
        <h4 className="title text-center">
            <span style={{color: "rgb(211, 48, 142)"}}>БИТ.</span><span style={{color: "rgb(47, 51, 141)"}}>СТРОИТЕЛЬСТВО 365</span><br />
            <small>разработано для крупных строительных компаний<br />
            и адаптировано для малых предприятий</small>
        </h4>
    </div>
</div>


export default SingleColumnWrapper;