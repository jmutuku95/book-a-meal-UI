import React from "react";
import { $, origin } from "./helpers";
import {
    //Route,
    Link,
    //Switch,
    // Redirect
} from 'react-router-dom';


export default class Meal extends React.Component{
	constructor(props){
		super(props)
		this.state = {name: '', price: '', description: '', meals: []}

		this.handleNameChange = this.handleNameChange.bind(this);
		this.handlePriceChange = this.handlePriceChange.bind(this);
		this.handleDescriptionChange =this.handleDescriptionChange.bind(this);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.getMeals = this.getMeals.bind(this);
		this.displayMeals = this.displayMeals.bind(this);
		this.getMeals();


	}

	getMeals(){
		const bearer_token = "Bearer " + localStorage.getItem('access_token')
        $.ajax({
            type: "GET",
            url: origin + '/meals',
            async: true,
            dataType: 'json', //you may use jsonp for cross origin request
            crossDomain: true,
            
            headers: {
                "Authorization": bearer_token,
                "Access-Control-Allow-Origin": "*",
            },

            success: function (resp) {
                this.setState({meals: resp.data});
            }.bind(this),

            error: function (xhr, status, err) {
                console.log('Unsuccessful request: ' + err.toString());
            }
        });

	}

	handleNameChange(event){
		this.setState({name: event.target.value});

	}

	handlePriceChange(event){
		this.setState({price: event.target.value});

	}

	handleDescriptionChange(event){
		this.setState({description: event.target.value});

	}

	handleSubmit(event){
		event.preventDefault();

	}
	handleEdit(event){
		event.preventDefault();

	}
	handleDelete(event){
		event.preventDefault();

	}

	displayMeals(props){
		const meals = props.meals;
		if (meals){
			var markup = "<table><thead><tr> <th>Meal Id</th> <th>Meal Name</th> <th>Price</th> <th>Description</th><th></th><th></th><th></th></tr></thead><tbody>"
			var i;
            for (i = 0; i < meals.length; i++) {
            	var mealId = meals[i].meal_id
                markup += "<tr><td>" + mealId + "</td>";
                markup += "<td>" + meals[i].name + "</td>";
                markup += "<td>" + meals[i].price + "</td>";
                markup += "<td>" + meals[i].description + "</td>";
                markup += "<td>" + '<a href="/meal/edit/' + mealId + '"> Edit </a></td>'
                markup += "<td>" + '<a href="/meal/delete/' + mealId +'"> Delete </a></td>'
                markup += "<td>" + '<a href="/meal/add_to_menu/' + mealId +'"> Add to Menu </a></td>'
                markup += "</tr>"
            } 
            markup += "</tbody></table>"
            var rows = {__html: markup}
            return (
                <div dangerouslySetInnerHTML={rows} />
            );
		}
	}

	render() {
		const meals = this.state.meals
		return (
			<div>
				<h2>Meals</h2>
				<h3>My Meals</h3>
					<div>
						<this.displayMeals meals={ meals }/>
					</div>

				<h3> Add A Meal </h3>
				<form className="form-Group " onSubmit={this.handleSubmit}>
					<label>
						Meal Name: <input type="text" className="form-control" placeholder="e.g Rice" onChange={this.handleNameChange} required />
					</label>
					<br/>
					<label>
						Price <input type="number" className="form-control" placeholder="200" onChange={this.handlePriceChange} required />
					</label>
					<br/>
					<label>
						Description <input type="text" className="form-control" placeholder="A brief description of the meal" onChange={this.handleDescriptionChange} required/>
					</label>
					<br/>
					<input type="submit" value="Add Meal" className="btn btn-primary" />
				</form>
			</div>
			);
	}
}