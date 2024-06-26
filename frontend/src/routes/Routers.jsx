import Home from "../pages/Home"
import Services from "../pages/Services"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import Contact from "../pages/Contact"
import Doctors from "../pages/Doctors/Doctors"
import DoctorsDetails from "../pages/Doctors/DoctorsDetails"
import ProtectedRoute from './ProtectedRoute.jsx'
import CheckoutSuccess from "../pages/CheakoutSucess.jsx"


import {Routes , Route} from 'react-router-dom'
import MyAccount from "../Dashboard/userAccount/Myaccount"
import Dashboard from "../Dashboard/doctorAcount/Dashboard"

const Routers = () => {
  return <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/home' element={<Home/>} />
    <Route path='/doctors' element={<Doctors/>} />
    <Route path='/doctors/:id' element={<DoctorsDetails/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/register' element={<Signup/>} />
    <Route path='/contact' element={<Contact/>} />
    <Route path='/services' element={<Services/>} />
    <Route path='/checkout-success' element={<CheckoutSuccess/>} />
    <Route path='/users/profile/me' element={ <ProtectedRoute allowedRoles={['patient']}><MyAccount/></ProtectedRoute>} />
    <Route path='/doctors/profile/me' element={<ProtectedRoute  allowedRoles={['doctor']}><Dashboard/></ProtectedRoute>} />
    
   
    {/* <Route path='/doctors/profile/me' element={<Dashboard/>} /> */}
  

  </Routes>
}

export default Routers