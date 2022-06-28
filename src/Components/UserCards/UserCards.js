import React from 'react'
import './UserCards.css'

const UserCards = ({user}) => {
    return (
        <div className='user-card' key={user._id}>
            <p><strong>Username</strong> : {user.username}</p>
            <p><strong>Place</strong> : {user.place}</p>
            <p><strong>Longitude</strong> : {user.longitude}</p>
            <p><strong>Latitude</strong> : {user.latitude}</p>
        </div>
    )
}

export default UserCards