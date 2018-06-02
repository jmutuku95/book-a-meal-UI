import React from "react";
import { $, origin } from "./helpers";


export default class Signin extends React.Component {
    constructor(props){
        super(props);
        this.state = { username: '', password: '', access_token: ''};
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleUsernameChange(event){
        // keep updating as user types
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event){
        this.setState({password: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        var password = this.state.password;
        var username = this.state.username;
        var url = origin + '/auth/signin';
        var user_data = {username: username, password: password};
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
                // persist access token in localStorage
                localStorage.setItem('access_token', data.access_token);
                this.setState({access_token: data.access_token});
                console.log(data.message);
            }.bind(this),
            error: function (xhr, status, err) {
                console.log('Could Not Login: ' + err.toString());
                this.setState({username:'', password:''})
            }.bind(this)
        });
    }
    render(){
        return(

            <form className="form-Group " onSubmit={this.handleSubmit}>
                <h3>Already have an account? Sign In</h3>
                <label>
                    Username: <input type="text" className="form-control" placeholder="username" onChange={this.handleUsernameChange} required />
                </label>
                <br/>
                <label>
                    Password: <input type="password" className="form-control" onChange={this.handlePasswordChange} required />
                </label>
                <br/>
                <input className="btn btn-primary" type="submit" value="Sign In" />
            </form>
        );
    }
}