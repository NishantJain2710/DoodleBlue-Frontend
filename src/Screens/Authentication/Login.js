import React,{useState, useRef, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate , Link  } from 'react-router-dom';

import { login } from '../../actions/Authentication';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {ThreeDots} from "react-loader-spinner";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Cookies from 'universal-cookie'

import './AuthPage.css';

const Login = () => {
    const dispatch = useDispatch();
    const Cookie = new Cookies()
    let navigate = useNavigate();

    const [authToken, setAuthToken] = useState(Cookie.get('authToken'))

    const usernameRef = useRef()
    const passwordRef = useRef()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    useEffect(()=>{
        if(authToken){
            navigate('/')
        }
        // eslint-disable-next-line
    },[authToken])

    useEffect(()=>{
        if(error){
            toast.error(error)
        }
        if(userInfo){
            toast.success('!! Login Successful !!')
            Cookie.set('authToken', userInfo.authToken, { path: '/' });
            setAuthToken(userInfo.authToken)
            navigate('/')
        }
        // eslint-disable-next-line
    },[error, userInfo, history])

    const handleLogin = (e) => {
        e.preventDefault();
        const enteredUserName = usernameRef.current.value;
        const enteredPassword = passwordRef.current.value;

        dispatch(login({
            username:enteredUserName,
            password:enteredPassword
        }))
    }

    return (
        <div className='auth-screen'>
            <div className='loader'>
                {loading && <ThreeDots
                    color="#002A5D"
                    height={100}
                    width={100}
                />}
            </div>
            
            <ToastContainer 
                position="bottom-right"  
                autoClose={5000}
            />

            <div className='auth-card'>
                <div>
                    <label htmlFor='username'>Username</label>
                    <input 
                        type='text' 
                        id='username'  
                        required
                        ref={usernameRef}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input 
                        type='password' 
                        id='password'  
                        required
                        ref={passwordRef}
                    />
                </div>
                <ul>
                    <li>
                        <Link to='/register'>Create a new account?</Link>
                    </li>
                    <li>
                        <Link to='/upload'>upload users via csv file.</Link>  
                    </li>
                </ul>
                <div>
                    <button onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login