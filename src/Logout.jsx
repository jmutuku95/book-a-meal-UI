import React from "react";
import { getToken} from "./helpers";


export default class Logout extends React.Component{
    constructor(props){
        super(props)
        this.state = {access_token: getToken()};
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(event){
        event.preventDefault();
        localStorage.removeItem('access_token')
    }

    render(){
        this.handleLogout()
        return(
            <div>
                <p>You have successfully logged out. See you soon!</p>
            </div>
        )
    }
}