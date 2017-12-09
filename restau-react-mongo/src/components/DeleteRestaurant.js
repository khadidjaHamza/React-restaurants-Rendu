import React from "react";

class DeleteResto extends React.Component{
    constructor(props){
        super(props);
        this.state={
            _id : "",
            restWasDeleted : ""
        }
        this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event){
        const id = event.target.value;
        this.setState({
            _id : id
        })
    }
    handleDeleteSubmit(event){
       event.preventDefault();
       const _id = this.state._id;
       let url = "http://localhost:8080/api/restaurants/"+ _id
       console.log(url)
       fetch(url,{
        method: "DELETE"
        })
       .then(response=>{
           return response.json()
       }).then(res=>{
          let result = res.succes;
          alert('Suppression reussie', result)
          this.setState({ restWasDeleted:result}) 
       }).catch(err=>{
        alert("erreur dans la suppression url non trouvee \n URL: "+url)
           console.log("erreur dans la suppression" + err);
       }
    )
    }

    render(){
        return(
            <div>
                     <h2>Supremer un restaurant</h2>   
            <form onSubmit={this.handleDeleteSubmit}>
            <label>
            Id du restaurant a supprimer :
               <input type="text" value={this.state.nom} name="nom" onChange={this.handleInputChange}/>
               <button className="btn btn-danger" >
                  <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                </button>
            </label>
            </form>
            </div>
            
        )
        
        
    }
}

export default DeleteResto;