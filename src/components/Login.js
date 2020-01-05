import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from '../actions/loginActions';
import Conf from "../config/Conf";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            pseudoValue: "",
            passwordValue: ""
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePass = this.onChangePass.bind(this);


    }
    onChangeName(value) {
        this.setState({pseudoValue:value})
    }
    onChangePass(value) {
        this.setState({passwordValue:value})
    }


    async onSubmit(e) {
        e.preventDefault();
        const body = {
            username: this.state.pseudoValue,
            password: this.state.passwordValue
        }
        await this.props.login(body);
        // fetch(url, {
        //     method: 'POST',
        //     headers: {
        //       Accept: 'application/json',
        //       'Content-Type': 'application/json',
        //     },
        //     body,
        //   })
        //     .then(response => response.json())
        //     .then((responseJson) => {
        //       console.log(responseJson);
        //           })
        //           .catch((err) => {
        //            console.log('rr', err);
        //           });
    }
    render() {
        return (

            <div className="container">
                <div className="d-flex justify-content-center h-100">
                    <div className="card">
                        <div className="card-header">
                            <h3>Sign In</h3>
                        </div>
                        <div className="card-body" >
                            <form onSubmit={this.onSubmit}>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="username" value={this.state.value}
                                        onChange={(e) => this.onChangeName(e.target.value)} />

                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                                    </div>
                                    <input type="password" className="form-control" placeholder="password" value={this.state.value}
                                        onChange={(e) => this.onChangePass(e.target.value)} />
                                </div>
                                <div className="row align-items-center remember">
                                    <input type="checkbox" />Remember Me
					</div>
                                <div className="form-group">
                                    <input type="submit" value="Login" className="btn float-right login_btn" />
                                </div>
                            </form>
                        </div>
                        <div className="card-footer">
                        </div>
                    </div>
                </div>
            </div>


            
        );
    }
}
const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    login: (body) => {
        dispatch(login(body));
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(Login)