import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from "./Header";
import Home from "./Home";
import Footer from './Footer';
import ProductDetails from './ProductDetails';
import Login from './authentication/Login';
import Signup from './authentication/Signup'
import ForgotPassword from './authentication/ForgotPassword'

function App() {
	return (
		<div className="w-full min-h-screen bg-gray-200 relative">
			<Router>
				<Routes>
					<Route path="/" element={ ( <><Header /><Home /><Footer /></>)} />
					<Route path="/product/:productId" element={ <><Header/><ProductDetails /></>} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
