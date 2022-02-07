import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from "./Header";
import Home from "./Home";
import Footer from './Footer';


function App() {

	return (
		<Router>
			<div className="w-full min-h-screen bg-gray-200 relative">
				<Header />
				<Home />
				<Footer />
			</div>
		</Router>
	);
}

export default App;
