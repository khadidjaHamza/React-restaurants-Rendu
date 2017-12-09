import React from 'react';
import AddRestaurants from './AddRestaurants';

class Restaurants extends React.Component{

	constructor(){
			super();
			this.renderInventory = this.renderInventory.bind(this);
			this.handleChange = this.handleChange.bind(this);
		}

	handleChange(e, key){
		const fish = this.props.fishes[key];
		//take a copy of that fish and update it with the new data
		const updatedFish = {
			...fish,
			[e.target.name]: e.target.value
		};
		this.props.updateFish(key, updatedFish);
	}
	renderInventory(key){

		const fish = this.props.fishes[key];
		return(
				<div className="fish-edit" key={key}>
			<input type="text" name="name" value={fish.name} onChange={(e) => this.handleChange(e, key)}/>
			<input type="text" name="price" value={fish.price} onChange={(e) => this.handleChange(e, key)} />
			<select name="status" value={fish.status} onChange={(e) => this.handleChange(e, key)}>
				<option value="available">Fresh</option>
				<option value="unavailable">Sold Out</option>
			</select>
			<textarea name="desc" value={fish.desc} onChange={(e) => this.handleChange(e, key)}></textarea>
			<input name="image" type="text" value={fish.image} onChange={(e) => this.handleChange(e, key)}/>
			<button onClick={() => this.props.removeFish(key)}>Remove Fish</button>	
				</div>
			)
	}
	render(){
		return (
			<div>
			<p>Inventory</p>
			{Object.keys(this.props.fishes).map(this.renderInventory)}
			<AddRestaurants addFish={this.props.addFish}/>
			<button onClick={this.props.loadSamples}>Load sample Fishes</button>
			</div>
		)

	}
}

export default Restaurants;