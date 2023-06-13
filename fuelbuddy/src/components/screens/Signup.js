import React, {useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { searchContext } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import bg1 from '../../assets/bg1.jpg'
import {BsFillEyeFill, BsFillEyeSlashFill} from 'react-icons/bs'
import axios from 'axios'

function Signup() {
  const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const {state, setState} = useContext(searchContext)

    const navigate = useNavigate()

    const [loginDetails, setLoginDetails] = useState({
        username: '',
        email: '',
        password: ''
    });

    function handleUsername(e) {
        setLoginDetails(prevState=>({...prevState, username: e.target.value}))
        console.log(loginDetails.username)
    }

    function handleEmail(e) {
        setLoginDetails(prevState=>({...prevState, email: e.target.value}))
        console.log(loginDetails.email)
    }

    function handlePassword(e) {
        setLoginDetails(prevState=>({...prevState, password: e.target.value}))
        console.log(loginDetails.password)
    }

    const handleShowPassword = () => {
        setShowPassword(prevState => !prevState);
    }

    function handleSignup(e) {         
        e.preventDefault();    
        if (loginDetails.email && !(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(loginDetails.email))) {            
            return toast.error(`Invalid Email`, {
                position: toast.POSITION.TOP_RIGHT
            });
        }        
        setIsLoading(true)
        axios
          .post(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
            name: loginDetails.username,
            email: loginDetails.email,
            password: loginDetails.password
          })
          .then((response) => {
            if(response.data.err) {
                setIsLoading(false)
                console.log(response.data.err)  
                toast.error(`${response.data.err}`, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
            else {                
                toast.success(`Successfully signed in`, {
                    position: toast.POSITION.TOP_RIGHT
                })  
                localStorage.setItem("user", JSON.stringify(response.data.user))
                setState(prevState=> {
                    return {
                        user: response.data.user
                    }
                })
                navigate('/')
            }
          });                            
    }

  return (
    <div className="login-main">
        <img src={bg1} alt="" className="bg" />
        <form className="login" onSubmit={handleSignup}>
            <h2>Sign Up</h2>
            <div className="field">
                <p>Name</p>
                <input type="text" placeholder="Enter your username" value={loginDetails.username} onChange={handleUsername}/>
            </div>
            <div className="field">
                <p>Email</p>
                <input type="text" placeholder="Enter your email" value={loginDetails.email}  onChange={handleEmail}/>    
            </div>
            <div className="field">
                <p>Password</p>
                <input type={showPassword ? 'text' : 'password'} placeholder="Enter your Password" value={loginDetails.password}  onChange={handlePassword}/>    
                {!showPassword ? (<BsFillEyeFill onClick={handleShowPassword} className='show-password'/>) : (<BsFillEyeSlashFill onClick={handleShowPassword} className='show-password'/>)}
            </div>

            <div className="login-submit">
                <button type="submit">Sign Up</button>
            </div>
            
            <p className="crt-acc">Already have an account?<Link to='/signin' >Login</Link></p>
        </form>
        <ToastContainer />
    </div>
  );
}

export default Signup;
