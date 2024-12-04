import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/home'
import { Navigate, Route,BrowserRouter as Router, Routes } from 'react-router-dom'
import UserProfile from './pages/UserProfile'
import AddHospital from './pages/AddHospital'
import PatientRegistration from './pages/RegisterPatient'
import ViewHospital from './pages/ViewHospital'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/userProfile' element={<UserProfile></UserProfile>}></Route>
        <Route path='/viewHospital' element={<ViewHospital></ViewHospital>}></Route>
        <Route path='/add-hospital' element={<AddHospital></AddHospital>}></Route>
        <Route path='/register-patient' element={<PatientRegistration></PatientRegistration>}></Route>
        {/* <Route path='/view-auction/:id' element={<AuctionPage></AuctionPage>}></Route> */}
      </Routes>
      
         </Router>
    </>
  )
}

export default App
