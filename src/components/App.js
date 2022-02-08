import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { ACTIONS, fetchBasket } from '../redux/actions'
import Header from "./Header";
import Home from "./Home";
import Footer from './Footer';
import ProductDetails from './ProductDetails';
import Login from './authentication/Login';
import Signup from './authentication/Signup'
import ForgotPassword from './authentication/ForgotPassword'
import Cart from './cart-and-checkout/Cart'
import Checkout from './cart-and-checkout/Checkout'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe('pk_test_51KPg5nHUOdMFaBHmnqMPEALXISXFyDNA6Fq2xYB6rfdVBkfgGDo2VCcq3jllLPKUMOD9SpJvYepxB3kCWYpmEDLH00o0vEdn9h')

function App() {
	const dispatch = useDispatch()
	onAuthStateChanged(auth, user => {
		if (user) {
			dispatch({
				type: ACTIONS.LOG_IN,
				payload: { currentUser: user }
			})
			dispatch(fetchBasket(user.uid))
		} else {
			dispatch({
				type: ACTIONS.LOG_OUT
			})
		}
	})

	return (
		<div className="w-full min-h-screen bg-gray-200 relative">
			<Router>
				<Routes>
					<Route path="/" element={ ( <><Header /><Home /><Footer /></>)} />
					<Route path="/product/:productId" element={ <><Header/><ProductDetails /></>} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
					<Route path="/cart" element={<><Header /><Cart /></>} />
					<Route path="/checkout" element={ <Elements stripe={stripePromise}><Checkout /></Elements>} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
