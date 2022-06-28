import React, {useRef, useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate , Link  } from 'react-router-dom';

import { register } from '../../actions/Authentication';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {ThreeDots} from "react-loader-spinner";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Cookies from 'universal-cookie'

const Register = () => {
    const dispatch = useDispatch();
    const Cookie = new Cookies()
    let navigate = useNavigate();

    const [authToken, setAuthToken] = useState(Cookie.get('authToken'))

    const usernameRef = useRef()
    const passwordRef = useRef()
    const placeRef = useRef()
    const latitudeRef = useRef()
    const longitudeRef = useRef()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

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
            toast.success('!! Register Successful !!')
            Cookie.set('authToken', userInfo.authToken, { path: '/' });
            setAuthToken(userInfo.authToken)
            navigate('/')
        }
        // eslint-disable-next-line
    },[error, userInfo, history])



    const handleRegister = (e) => {
        e.preventDefault();
        const enteredUserName = usernameRef.current.value;
        const enteredPassword = passwordRef.current.value;
        const enteredPlace = placeRef.current.value;
        const enteredLatitude = latitudeRef.current.value;
        const enteredLongitude = longitudeRef.current.value;

        dispatch(register({
            username:enteredUserName,
            password:enteredPassword,
            place:enteredPlace,
            latitude:enteredLatitude,
            longitude:enteredLongitude
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
                <div>
                    <label htmlFor='place'>Place</label>
                    <input 
                        type='text' 
                        id='place'  
                        required
                        ref={placeRef}
                    />
                </div>
                <div>
                    <label htmlFor='latitude'>Latitude</label>
                    <input 
                        type='number' 
                        id='latitude'  
                        required
                        ref={latitudeRef}
                    />
                </div>
                <div>
                    <label htmlFor='longitude'>Longitude</label>
                    <input 
                        type='number' 
                        id='longitude'  
                        required
                        ref={longitudeRef}
                    />
                </div>
                <ul>
                    <li>
                        <Link to='/login'>Already have an account?</Link>
                    </li>
                    <li>
                        <Link to='/upload'>upload users via csv file.</Link>  
                    </li>
                </ul>
                <div>
                    <button onClick={handleRegister}>Register</button>
                </div>
            </div>
        </div>
    )
}

export default Register