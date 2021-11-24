import logo from './logo.svg';
// import './App.css';
import OrderLogin from './pages/landingPage/OrderLogin';
import {Routes,BrowserRouter as Router,Route} from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';

function App() {
  return (
    <div> 
      <Router>
        <Routes>
          <Route exact path="/"  element={<OrderLogin/>}/>
          <Route exact path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
