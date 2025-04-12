import Login from './pages/Login'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserManagement from './pages/UserManagement';
import UserForm from './pages/UserForm';
import ProfilePage from './pages/ProfilePage';
import Manager from './pages/Manager';
import Associate from './pages/Associate';
import Executive from './pages/Executive';
import Admin from './pages/Admin';
import WeatherAlert from './pages/WeatherAlert';
import Userdetail from './pages/Userdetail';
import Reports from './pages/Reports';
import Dashboard from './pages/Dashboard';
import Associatereport from './pages/Associatereport';
import Executivereport from './pages/Executivereport';
import Managerreport from './pages/Managerreport';


function App() {

  return (
   <Router>
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/user' element={<UserManagement/>} />
      <Route path='/userform' element={<UserForm/>} />
      <Route path='/profile' element={<ProfilePage/>} />
      <Route path='/manager' element={<Manager/>} />
      <Route path='/manager/report' element={<Managerreport/>} />
      <Route path='/associate' element={<Associate/>} />
      <Route path='/associate/report' element={<Associatereport/>} />
      <Route path='/executive' element={<Executive/>} />
      <Route path='/executive/report' element={<Executivereport/>} />
      <Route path='/admin' element={<Admin/>} />
      <Route path='/admin/:id' element={<Userdetail/>} />
      <Route path='/alert' element={<WeatherAlert/>} />
      <Route path='/admin/report' element={<Reports/>} />
      <Route path='/admin/dashboard' element={<Dashboard/>} />
    </Routes>
   </Router>
  )
}

export default App
