import logo from './logo.svg';
// import './App.css';
import OrderLogin from './pages/landingPage/OrderLogin';
import {Routes,BrowserRouter as Router,Route} from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import CartPage from './pages/CartPage/CartPage';
import ProtectedRoute from './protectedRoute/ProtectedRoute';
import Wishlist from './pages/wishlist/Wishlist';
import OrderSuccess from './pages/orderSuccess/OrderSuccess';

function App() {
  return (
    <div> 
      <Router>
        <Routes>
          <Route exact path="/"  element={<OrderLogin/>}/>
          <Route 
            exact 
            path="/dashboard" 
            element={<ProtectedRoute>
                      <Dashboard/>
                    </ProtectedRoute>}
          />
          <Route 
            exact 
            path="/cart" 
            element={<ProtectedRoute>
                      <CartPage/>
                    </ProtectedRoute>}
          />
          <Route 
            exact 
            path="/wishlist" 
            element={<ProtectedRoute>
                      <Wishlist/>
                    </ProtectedRoute>}
          />
          <Route 
            exact 
            path="/success" 
            element={<ProtectedRoute>
                      <OrderSuccess/>
                    </ProtectedRoute>}
          />

        </Routes>
          
      </Router>
    </div>
  );
}

export default App;
