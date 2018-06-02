import React from "react";
import { Button } from "react-bootstrap";
import { $, origin } from "./helpers";


export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: '', email: '', password: '', password1: ''};
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePassword1Change = this.handlePassword1Change.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(event){
        // update field as user types
        this.setState({ username: event.target.value });
    }

    handleEmailChange(event) {
        // update field as user types
        this.setState({ email: event.target.value });
    }

    handlePasswordChange(event) {
        // update field as user types
        this.setState({ password: event.target.value });
    }

    handlePassword1Change(event) {
        // update field as user types
        this.setState({ password1: event.target.value });
    }
    handleSubmit(event){
        // clean up input and send user information
        event.preventDefault();
        var p1 = this.state.password;
        var p2 = this.state.password1;
        var email = this.state.email;
        var username = this.state.username;
        var user_data = {username: username, email: email, password: p1};

        if (p1 === p2){
            var url = origin + '/auth/signup';
            // make post request
            $.ajax({
                url: url,
                dataType: 'json',
                type: 'POST',
                data: JSON.stringify(user_data),
                async: true,
                contentType: 'application/json',
                crossDomain: true,
                headers: {
                    "Access-Control-Allow-Origin": ""
                },
                success: function (data) {
                    // persist access token in sessionStorage
                    localStorage.setItem('access_token', data.access_token);
                    console.log(data.message);
                    location.reload(true)
                }.bind(this),
                error: function (xhr, status, err) {
                    console.log('User Registration Failed: ' + err.toString());
                }.bind(this)
            });
        }
        else {
            alert('Passwords should match')
        }
    }

    render() {
        return (
            <div>

                <form className="form-Group" onSubmit={ this.handleSubmit }>
                    <h3> Don't have an account? Create One Here!</h3>
                    <label>
                        Username: <input type="text" className="form-control" placeholder="username" name="username" onChange={this.handleUsernameChange} required />
                    </label>
                    <br/>
                    <label>
                        E-mail: <input type="text" className="form-control" placeholder="example@mail.com" name="email" onChange={this.handleEmailChange} required />
                    </label>
                    <br/>
                    <label>
                        Password: <input type="password" className="form-control" onChange={this.handlePasswordChange} name="password" required />
                    </label>
                    <br/>
                    <label>
                        Confirm Password: <input type="password" className="form-control" onChange={this.handlePassword1Change} name="password1" required />
                    </label>
                    <br/>
                    <input className="btn btn-primary" type="submit" value="Sign Up" />
                </form>
            </div>
        );
    }
}