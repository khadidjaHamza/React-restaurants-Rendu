import React from 'react';

class Accueil extends React.Component{
	goToRestaurants(event){
		event.preventDefault();
		console.log('You changed the URL');
		//first grab the text from the box
		const restaurantID = this.restaurantsInput.value;
	    console.log( `going to ${restaurantID}`)
		//seconde transition from / to /store/storeId
		this.context.router.transitionTo(`/restaurants/${restaurantID}`)
	}
	render() {
			return (
				<form className="store-selector" onSubmit={(e) => this.goToRestaurants(e)}>
				   <p>Bienvenue</p>
				   <input type="text" required 
				   defaultValue="getRestaurants" ref={(input)=>{this.restaurantsInput = input}}/>
				   <button type="submit">Afficher les restaurants</button>
				</form>
				)
			}
}
// pour assigner une nouvelle proprieté a notre obj qui va nous permettre la modification de l'URL

Accueil.contextTypes = {
	router: React.PropTypes.object
}
export default Accueil;