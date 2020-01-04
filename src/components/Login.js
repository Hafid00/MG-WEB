import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from '../actions/loginActions';
import Conf from "../config/Conf";

class Login extends Component {
    constructor(){
        super();
        this.state={
            pseudoValue:'',
            passwordValue:''
        }
    }
    login = () => {
        const url = `${Conf.API_URL}/api/users/login/`;

        const body = {
            username: this.state.pseudoValue,
            password: this.state.passwordValue
        }
        this.props.login(body);
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
            <form className="auth-inner">
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" value={this.state.pseudoValue} onChange={(e)=>this.setState({pseudoValue: e.target.value})}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" value={this.state.passwordValue} onChange={(e)=>this.setState({passwordValue: e.target.value})}/>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button className="btn btn-primary btn-block" onClick={this.login}>Submit</button>
            </form>
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
export default connect(mapStateToProps,mapDispatchToProps)(Login)