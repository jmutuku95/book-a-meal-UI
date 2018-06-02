import React from "react";
import { Button } from "react-bootstrap";
import { $, origin } from "./helpers";



export default class Home extends React.Component {
    constructor() {
        super()
        this.state = {message: 'Check your connection to the server'};

        // bind to make 'this' work in callback
        this.getWelcomeMessage = this.getWelcomeMessage.bind(this);
        this.getWelcomeMessage();
    }

    getWelcomeMessage(){
        $.ajax({
            type: "GET",
            url: origin + '/home',
            async: true,
            dataType : 'json', //you may use jsonp for cross origin request
            crossDomain: true,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            success: function(data) {
                this.setState({message: data});
              }.bind(this)

            });

    }

    render() {
      return (
        <div>
            <p className="text-center"><strong>{this.state.message}</strong></p>
        </div>
      );
    }
}