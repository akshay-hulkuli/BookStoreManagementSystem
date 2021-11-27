import logo from './logo.svg';
// import './App.css';
import OrderLogin from './pages/landingPage/OrderLogin';
import {Routes,BrowserRouter as Router,Route} from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import CartPage from './pages/CartPage/CartPage';
import ProtectedRoute from './protectedRoute/ProtectedRoute';

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
