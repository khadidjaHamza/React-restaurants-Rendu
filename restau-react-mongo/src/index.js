// let's go!
/*import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();*/

// let's go!
import React from 'react';
import {BrowserRouter,Match,Miss} from 'react-router';
import {render} from 'react-dom';
import App from './App';
import NotFound from './NotFound';
import Accueil from './Accueil'
import AddRestaurants from './components/AddRestaurants'
const Root = () => {
	return(

			<BrowserRouter>
				<div>
				<div>
				<Match exactly pattern="/" component={Accueil}/>
				<Match pattern="/restaurants/:restaurantID" component={App}/>
				<Match pattern="/AddRestaurants" component={AddRestaurants}/>
				<Miss component={NotFound}/>
				</div>
				</div>
			</BrowserRouter>

		)
}

render(<Root/>,document.querySelector('#main'));
