
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/NavbarComponent';
import HomeComponent from './components/Home/HomeComponent';
import ContactComponent from './components/Contact/ContactComponent';
// import AuthenticationComponent from './components/Authentication/AuthenticationComponent';
import ModelsComponent from './components/Shop/ModelsComponent';
import ModelsDetail from './components/Shop/ModelsDetail';
import CartComponent from './components/Cart/CartComponent';
import ProfileComponent from './components/Profile/ProfileComponent';
import CheckoutComponent from './components/Checkout/CheckoutComponent';
import Login from './components/Authentication/login';
import Registration from './components/Authentication/Register';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminUser from './components/Admin/AdminUser';
import AdminBook from './components/Admin/AdminBook';
import ProtectedRoute from './ProtectedRoutes/ProtectedRoute'
import AdminOrder from './components/Admin/AdminOrder';
import UserOrder from './components/order/UserOrder';
import AdminInquiry from './components/Admin/AdminInquiry';


function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element = {<HomeComponent />}/>
      <Route path="/books" element = {<ModelsComponent/>}/>
      <Route path="/cart" element={<ProtectedRoute role="user"><CartComponent /></ProtectedRoute>}/>
      <Route path='/contact' element ={<ContactComponent />}/>
      <Route path='/profile' element ={<ProfileComponent />}/>
      <Route path='/register' element ={<Registration/>}/>
      <Route path='/login' element ={<Login/>}/>
      <Route path="/modelsDetail/:id" element={<ModelsDetail />} />
      <Route path='/checkout/:id' element ={<CheckoutComponent />}/>
      <Route path="/userorder" element={<ProtectedRoute role="user"><UserOrder /></ProtectedRoute>} />



      <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
      <Route path='/adminbook' element ={<ProtectedRoute role="admin"><AdminBook /></ProtectedRoute>}/>
      <Route path="/adminuser" element={<ProtectedRoute role="admin"><AdminUser /></ProtectedRoute>} />
      <Route path="/adminorder" element={<ProtectedRoute role="admin"><AdminOrder /></ProtectedRoute>} />
      <Route path="/admininquiry" element={<ProtectedRoute role="admin"><AdminInquiry /></ProtectedRoute>} />

      </Routes>
    </Router>
    </>

  );
}

export default App;
