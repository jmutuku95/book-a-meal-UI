import React from "react";
import { $, origin } from "./helpers";


export default class Menu extends React.Component {
    constructor(props){
        super(props)
        this.state = {menu:''}
        this.getMenu = this.getMenu.bind(this)
        this.displayMenu =this.displayMenu.bind(this)
    }

    getMenu(){
        const access_token = sessionStorage.getItem('access_token')
        $.ajax({
            type: "GET",
            url: origin + '/menu',
            async: true,
            dataType: 'json', //you may use jsonp for cross origin request
            crossDomain: true,
            headers: {
                "Authorization": "Bearer " + access_token,
                "Access-Control-Allow-Origin": "*",
            },
            success: function (data) {
                this.setState({ message: data });
                this.setState({menu: data.menu})
            }.bind(this),
            error: function (xhr, status, err) {
                console.log('Unsuccessful request: ' + err.toString());
            }.bind(this)
        });
    }

    listMeals(props){
        const meals = props.meals
        if (meals){
            var markup = "<table class='table table-striped table - hover'><thead><tr><th>Meal ID</th><th>Meal Name</th><th>Price</th><th>Description</th></tr></thead><tbody>";
            var i;
            for (i = 0; i < meals.length; i++) {
                markup += "<tr><td>" + meals[i].meal_id + "</td>";
                markup += "<td>" + meals[i].name + "</td>";
                markup += "<td>" + meals[i].price + "</td>";
                markup += "<td>" + meals[i].description + "</td>";
                markup += "</tr>"
            } 
            markup += "</tbody"
            var rows = {__html: markup}
            return (
                <div dangerouslySetInnerHTML={rows} />
            );
        }
        else {
            return (
                <tr>
                    <td colSpan="4">No Meals in this Menu</td>
                </tr>
                
            )
        }
    }

    displayMenu(){
        this.getMenu()
        var message = this.state.message
        var menu = this.state.menu
        var meals = [{ 'meal_id': 1, 'name': 'Fish', 'price': 200, 'description': 'Blah blah Tilapia' }, { 'meal_id': 1, 'name': 'Fish', 'price': 200, 'description': 'Blah blah Tilapia' }]
        return (
            <div>
                {message ? (
                    <p>{message}</p>
                ):
                (
                    <p></p>
                )}
                <h3>Date: {menu.date}</h3>
                <this.listMeals meals={meals} />
            </div>
        );
    }
    
    render() {
        return(
            <div>
                <h2>Menu</h2>
                <this.displayMenu/>
            </div>
        );
    }

}
