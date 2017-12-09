import React from 'react';

class Restaurant extends React.Component{

	constructor(props){
        super(props);
        this.state = {
                     nom :'',
                     cuisine :"",
                     resultat :""
                    };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputSubmit = this.handleInputSubmit.bind(this);
    }

    handleInputChange(event){
            const target = event.target;
            const value = target.value;
            const name = target.name;

         this.setState({[name] : value});
     }

     handleInputSubmit(event){
        event.preventDefault();

        let form = event.target;
        let dataForm = new FormData(form);
        let url = "http://localhost:8080/api/restaurants/";

        fetch (url, {
            method:"POST",
            body:dataForm
        })
        .then(response=>{
            return response.json();
        })
        .then(res=>{
            const result = res.msg;
            this.setState({resultat :result });
            alert('Ajout reussi');
        }).catch(err=>{
			alert("erreur dans la creation url non trouvee \n URL: "+url)
			console.log("erreur dans la creation" + err);
		}
	 )
     }

	render(){
		return (
    
			<div>
              <h2>Ajouter un restaurant</h2>
            <form onSubmit={this.handleInputSubmit}>
			<div className="col-sm-5">
				<div className="form-group">
					<label className="pull-left">Cuisine*</label>
					<input type="text" value={this.state.cuisine} onChange={this.handleInputChange} name="cuisine" className="form-control" id="cuisine" placeholder="cuisine"  required/>
				</div>
				 <div className="form-group">
					<label className="pull-left">Name*</label>
					<input type="text" value={this.state.nom} onChange={this.handleInputChange} className="form-control" id="name" name="nom" placeholder="name" required/>
				</div>
			</div>
			<div className="col-sm-offset-4 col-sm-4">
				<button type="submit" className="btn btn-primary col-xs-12">Enregister</button>
			 
				<p>(*) Champs obligatoires.</p>
			</div> 
            </form>
            </div>
       
			
		)

	}
}


export default Restaurant;