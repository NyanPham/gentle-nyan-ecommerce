import { useEffect } from 'react'
import Header from "./Header";
import Hero from './Hero'
import IntroGrid from "./IntroGrid";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import FeaturedProducts from "./FeaturedProducts";


function App() {

	return (
		<Router>
			<div className="w-full min-h-screen bg-gray-200 relative">
				<Header />
				<Hero />
				<IntroGrid />
				<FeaturedProducts />
			</div>
		</Router>
	);
}

export default App;
