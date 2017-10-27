import React, { Component } from 'react';
import { connect } from 'react-redux';

var axios = require('axios');

const ActivationForm = (props) => 
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">

                <Header />

                <div className="card">
                    <div className="header">
                        <h4 className="title text-center">Активация учетной записи</h4>
                    </div>
                    <div className="content">
                        <form onSubmit={props.onSubmit}>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>Активационный код</label>
                                        <input type="text" className="form-control" required onChange={props.onCodeChange}  value={props.code} />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <p className="text-center">
                                        <button type="submit" className="btn btn-success btn-fill">Завершить регистрацию</button><br />
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
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

class AccountActivation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            code: "",
            inProgress: false,
            success: false,
            error: false
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onCodeChange = this.onCodeChange.bind(this);
    }

    componentDidMount() {
        
        const params = new URLSearchParams(this.props.location.search);
        const code = params.get('code');

        if (code != null) { 
            this.setState({code: code}); 
            this.activate();
        }
    }


    render() {
        return (
            <div>
                <ActivationForm onSubmit={this.onSubmit}
                                onCodeChange={this.onCodeChange}
                                code={this.state.code}
                 />
            </div>);
    }

    onSubmit(e) {
        e.preventDefault();

        this.activate();

    }

    onCodeChange(e) {
        this.setState({code: e.target.value});
    }


    activate() {

        this.setState({inProgress: true});
        

    }    

}

const mapStateToProps = (state) => {
    return {
    };
}



export default connect(mapStateToProps)(AccountActivation);
