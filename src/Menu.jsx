import React from "react";
import { $, origin } from "./helpers";


export default class Menu extends React.Component {
    constructor(props){
        super(props)
        this.state = {meals:'', date: ''};
        this.getMenu = this.getMenu.bind(this);
        this.displayMenu =this.displayMenu.bind(this);
        this.getMenu()
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
                "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjgxNDYwNzcsImlhdCI6MTUyODEzMTY3NywidXNlcm5hbWUiOiJtYXJ0aGEiLCJhZG1pbiI6ZmFsc2UsInN1cGVydXNlciI6ZmFsc2V9.h5JWYyw5DzLAgyIa2t5JdW8HrAhjD02O2cKZqGeGgcI",
                "Access-Control-Allow-Origin": "*",
            },
            success: function (data) {
                this.setState({meals: data.menu.meals, date: data.menu.date});
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
            markup += "</tbody></table>"
            var rows = {__html: markup}
            return (
                <div dangerouslySetInnerHTML={rows} />
            );
        }
        else {
            return (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Meal ID</th>
                                <th>Meal Name</th>
                                <th>Price</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="4">No Meals in this Menu</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
            )
        }
    }

    displayMenu(){
        var meals = this.state.meals
        return (
            <div>
                
                
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
