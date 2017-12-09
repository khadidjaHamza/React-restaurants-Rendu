import React, { Component } from 'react';
import AddRestaurants from './components/AddRestaurants'
import DeleteResto from './components/DeleteRestaurant';
import SearchRestaurant from './components/SearchRestaurant';
import  './App.css';
/* // Composant fonctionnel
function Hobby(props) {
  const liStyle = {
    backgroundColor: props.index % 2 === 0 ? 'lightpink' : 'red'
  };
    return(
      <li style={liStyle} onClick={() => props.HobbyWasClicked(props.hobbyName)}>
        {props.hobbyName}
      </li>
    )
} */
class App extends Component {
   
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.sortArray = this.sortArray.bind(this);
    this.state = {
      restaurants : [],
      input: "",
      page:0,
      add:"",
      restWasDeleted: false
    };
  }


  componentDidMount() {
    // this runs right before the <App> is rendered
    let url = "http://localhost:8080/api/getRestaurant";
		
		fetch(url)
       .then(responseJSON => {
         return responseJSON.json();
       })
       .then(res=> {
      this.setState({restaurants:res.data});
      console.log(this.state.restaurants[1]._id)
       }).catch(err => {
         console.log("erreur dans le get : " + err)
       });
  }

  componentWillUnmount() {
  }

  removeRestaurants(hobby) {
    const oldRest = this.state.restaurants;
    const position = oldRest.indexOf(hobby);
    this.setState({
      restaurants: oldRest.filter(
        (el, index) => {
          return (index !== position)
        }
      ),
      restWasDeleted : true
     } );
  }

  getPage(i) {
     //let url = "/api/getRestaurant?page="+i;
       let url = "http://localhost:8080/api/getRestaurant?page="+i;
       console.log(url)
     	fetch(url)
       .then(responseJSON => {
         return responseJSON.json();
       })
       .then(res => {
      this.setState({restaurants:res.data});
      console.log(this.state.restaurants[1]._id)
       }).catch(err => {
         console.log("erreur dans le get : " + err)
       });
   }
   prevPage() {
		this.state.page--;
		if(this.state.page <= 0){
			document.querySelector("#btnPrev").style = "click:none;";
			document.querySelector("#btnPrev").style.color='#000'
			document.querySelector("#btnPrev").disabled = true; 
			this.page=0;
			this.getPage(0);
			console.log('aucune pas de page en arrier')
		}else {
			this.getPage(this.state.page);
		}
	}
   nextPage() {
		this.state.page++;
		if(this.state.page > 0 && this.state.page < 50){
			document.querySelector("#btnNext").style = "";
			document.querySelector("#btnPrev").style.color='#fff'
			document.querySelector("#btnPrev").disabled = false;
			this.getPage(this.state.page);
		}
		if(this.state.page > 50){
			document.querySelector("#btnNext").style = "click:none;";
			document.querySelector("#btnNext").style.color='#000'
			document.querySelector("#btnNext").disabled = true; 
    }		
  }
  goToRestaurants(evnt){
		event.preventDefault();
		console.log('You changed the URL');
    console.log( `going to AddRestaurants`)
		//seconde transition from restaurants/getRestaurants to /AddRestaurants
    this.context.router.transitionTo(`/AddRestaurants`)
     this.state.add = <AddRestaurants 
      addRestaurant={this.addRestaurant} 
       />
    
    console.log(`${this.state.add}`);
  }
  sortArray(){
   
    var tab = [...this.state.restaurants];
    console.log(tab);
    tab.sort((a,b) => a.timeM - b.timeM);
    tab.map((item, i) => (<div key={i}> {item.matchID}  
                          {item.timeM} {item.description}</div>))
    console.log(tab);
    this.setState({restaurants: tab});
  }
  render() {
    
   let list = this.state.restaurants.map(
      (restaurant, index) => {
        return (
          <tr key={index}>
              <td>{restaurant.name}</td>
              <td>{restaurant.cuisine}</td>
				      <td className='text-center col-sm-1'>
					    <a className='btn btn-warning'>
					  	<span className='glyphicon glyphicon-pencil' aria-hidden='true'>
						  </span>
				    	</a>
        		</td>
          </tr>
        )
      }
    );

    return (
      <div className="App">
            <h3>My restaurants:</h3>
            
           
              <table id="table" className="table table-striped table-borderes">
                  <thead>
                    <tr>
                      <th onClick={this.sortArray}>Name</th>
                      <th>Cuisine</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list}
                  </tbody>
	            </table>
                <nav className="container" >
                    <div className="navbar-header navbar-left">
                        <button id="btnPrev"  className="btn btn-default btn-primary" onClick={this.prevPage}>Previous </button>
                    </div>
                    <div className="nav navbar-nav navbar-right">
                        <button id="btnNext" className="btn btn-default btn-primary " onClick={this.nextPage}>Next </button>
                    </div>
                </nav>
                {this.state.add}
              <nav>
                <div className="card">
                  <DeleteResto/>
                </div>
                <div className="tab">
                   <SearchRestaurant/>
                </div>
              </nav>
                <div className="card">
                  <AddRestaurants/>
                </div>
        </div>
    );
  }
}
App.contextTypes = {
	router: React.PropTypes.object
}
export default App;