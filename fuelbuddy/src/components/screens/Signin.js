import React, {useState, useContext, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { searchContext } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BsFillEyeFill, BsFillEyeSlashFill} from 'react-icons/bs'
import bg1 from '../../assets/bg1.jpg'

function Signin() {
    const {state, setState} = useContext(searchContext)
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");    
    const [loginDetails, setLoginDetails] = useState({
        email: '',
        password: ''
    });

    useEffect(()=> {

    }, [state])

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
                  
        axios
          .post(`${process.env.REACT_APP_BACKEND_URL}/signin`, {
            name: loginDetails.username,
            email: loginDetails.email,
            password: loginDetails.password
          })
          .then((response) => {     
            if(response.data.err) {                
                console.log(response.data.err)    
                return toast.error(`${response.data.err}`, {
                    position: toast.POSITION.TOP_RIGHT
                });                                                        
            }
            else {     
                console.log(response.data.user)                           
                localStorage.setItem("user", JSON.stringify(response.data.user))
                setState(prevState=> {
                    return {
                        user: response.data.user
                    }
                })  
                toast.success(`Succesfully signed in`, {
                    position: toast.POSITION.TOP_RIGHT
                }); 
                navigate('/')                                        
            }
          });       
          e.preventDefault();   
    }

  return (
    <div className="login-main">
        <img src={bg1} alt="" className="bg" />
        <form className="login" onSubmit={handleSignup}>
            <h2>Login</h2>
            <div className="field">
                <p>Username or Email</p>
                <input type="text" placeholder="Enter your email" value={loginDetails.email}  onChange={handleEmail}/>    
            </div>
            <div className="field">
                <p>Password</p>
                <input type={showPassword ? 'text' : 'password'} placeholder="Enter your Password" value={loginDetails.password}  onChange={handlePassword}/>    
                {!showPassword ? (<BsFillEyeFill onClick={handleShowPassword} className='show-password'/>) : (<BsFillEyeSlashFill onClick={handleShowPassword} className='show-password'/>)}
            </div>

            <div className="login-submit">
                <button type="submit">Login</button>
            </div>
            
            <Link to='/' className="fgt-pass">Forgot Password?</Link>
            <p className="crt-acc">Don't have an account?<Link to='/signup' >Create One</Link></p>
        </form>
    </div>
  );
}

export default Signin;
