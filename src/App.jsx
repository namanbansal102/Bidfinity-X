import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/home'
import { Navigate, Route,BrowserRouter as Router, Routes } from 'react-router-dom'
import UserProfile from './pages/UserProfile'
import AddHospital from './pages/AddAuction'
import PatientRegistration from './pages/RegisterPatient'
import ViewAuctions from './pages/ViewAuctions'
import BiddingPage from './pages/Bidding/BiddingPage'
import AddAuction from './pages/AddAuction'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/userProfile' element={<UserProfile></UserProfile>}></Route>
        <Route path='/viewAuctions' element={<ViewAuctions></ViewAuctions>}></Route>
        <Route path='/addAuction' element={<AddAuction></AddAuction>}></Route>
        <Route path='/register-patient' element={<PatientRegistration></PatientRegistration>}></Route>
        <Route path='/place-bid' element={<BiddingPage></BiddingPage>}></Route>
        {/* <Route path='/view-auction/:id' element={<AuctionPage></AuctionPage>}></Route> */}
      </Routes>
      
         </Router>
    </>
  )
}

export default App
