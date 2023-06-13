import React, {createContext, useState, useEffect} from 'react'
import { BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar'
import Signup from './components/screens/Signup'
import Signin from './components/screens/Signin'
import Home from './components/screens/Home'
import Services from './components/screens/Services'
import Book from './components/screens/Book'
import Orders from './components/screens/Orders'
import Order from './components/screens/Order'
import Aboutus from './components/screens/Aboutus'
import { ToastContainer, toast } from 'react-toastify';

export const searchContext = createContext();

const Routing = ({state, setState}) => {
  const navigate = useNavigate()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if(user) {
      setState(prevState=> {
          return {
              user: user
          }
      })        
    }else {
      navigate('/signin')
    }
  }, [])
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />  
        <Route path="/book" element={<Book />} />     
        <Route path="/orders" element={<Orders />} />        
        <Route path="/orders/:orderid" element={<Order />} />        
    </Routes>
  )
}

function App() {
  const [state, setState] = useState({user: undefined})
  const [type, setType] = useState('');
  const [prodDetails, setProdDetails] = useState({
    mbl: '',
    qty: '',
    loc: '',
  })
  const [orders, setOrders] = useState([])
  console.log(state)
  return (
    <searchContext.Provider 
      value={{state, setState, type, setType, prodDetails, setProdDetails, orders, setOrders}}
    >
    <BrowserRouter>
      <Navbar />
      <Routing state={state} setState={setState}/>
      <ToastContainer />
    </BrowserRouter>
    </searchContext.Provider>
  );
}

export default App;
