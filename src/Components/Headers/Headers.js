import React from 'react'
import Cookies from 'universal-cookie'

import './Headers.css';

const Headers = ({handlerAuthToken, userInfo}) => {

    const Cookie = new Cookies()

    const handleLogout = (e) =>{
        e.preventDefault();
        Cookie.remove('authToken')
        handlerAuthToken(Cookie.get('authToken'))
    }

    return (
        <div className='NavBar'>
            <h1>Hi {userInfo ? userInfo.username : ''}...</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Headers