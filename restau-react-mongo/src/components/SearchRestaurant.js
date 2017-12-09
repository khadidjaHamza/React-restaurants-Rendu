import React from 'react';

class SearchResto extends React.Component{
    constructor(props){
        super(props);
        this.state={
            restaurant : {},
            _id : ""
        }
        this.handleInputChange= this.handleInputChange.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    }
    handleInputChange(event){
        const id = event.target.value;
        this.setState({
            _id : id
        })
    }

    handleSearchSubmit(event){
        event.preventDefault();
        const _id = this.state._id;
        let url  = "http://localhost:8080/api/restaurants/"+_id ;
        console.log(url)
        fetch(url)
        .then(responseJSON => {
            return responseJSON.json();
          })
         .then(res => {
          //  console.log( this.state.restaurant);
         this.setState({ restaurant:res.restaurant });
         //console.log( this.state.restaurant.name);
         }).catch(err => {
            alert("erreur dans le get. url non trouvee \n URL: "+url)
			console.log("erreur dans le get " + err);
      });  
    }


   render(){

    let list=Object.keys(this.state.restaurant).map((key,index)=>{
        if(key === 'name') {
            console.log("test"+key)
            return <tr key={index} >
            <td>{this.state.restaurant.name}</td>
            <td >{this.state.restaurant.cuisine}</td>
            </tr>
        }
      
       
    })
       return(
          <div>
              <h2>Rechercher un restaurant </h2>
              <form onSubmit={this.handleSearchSubmit}>
                  <label>
                     ID du restaurant a rechercher :
                     <input type="text" value={this.state.nom} name="nom" onChange={this.handleInputChange}/>
                     <input type="submit" value="search" /> 
                  </label>
              </form>
              <table>
                <thead>
                   <tr>
                       <th>Name</th>
                      <th>Cuisine</th>                          
                   </tr>
                </thead>
                <tbody>
                    {list}
                </tbody>
              </table>
          </div> 
        
         
       )
   }
}
export default SearchResto;