import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from "./Header";
import Home from "./Home";
import Footer from './Footer';
import ProductDetails from './ProductDetails';


function App() {

	return (
		<Router>
			<Routes>
				<Route path="/" element={ (
										<div className="w-full min-h-screen bg-gray-200 relative">
											<Header />
											<Home />
											<Footer />
										</div>) 
				} />
				<Route path="/product/:productId" element={ <><Header/><ProductDetails /></>} />
			</Routes>
			
		</Router>
	);
}

export default App;
