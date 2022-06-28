import React,{useEffect, useState, useRef} from 'react'

import Cookies from 'universal-cookie'

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate   } from 'react-router-dom';

import { 
    IncognitoStatus, 
    userDetails, 
    NearByUsers,
    searchUsers
} from '../../actions/UserDetails';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {ThreeDots} from "react-loader-spinner";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UserCards from '../../Components/UserCards/UserCards';

import './MapScreen.css'
import Headers from '../../Components/Headers/Headers';

const MapScreen = () => {
    const dispatch = useDispatch();
    const Cookie = new Cookies()
    let navigate = useNavigate();

    const [authToken, setAuthToken] = useState(Cookie.get('authToken'))

    const IncognitoMode = useSelector(state => state.IncognitoMode)
    const { loading, error, message } = IncognitoMode

    const UserDetail = useSelector(state => state.UserDetail)
    const { loading:detailsLoading, error:detailsError, userDetails:info } = UserDetail

    const GetNearByUsers = useSelector(state => state.GetNearByUsers)
    const { loading:loadingUsers, error:errorUsers, users } = GetNearByUsers

    const SearchByGeo = useSelector(state => state.SearchByGeo)
    const { loading:loadingSearchUsers, error:errorSearchUsers, users:SearchUsers } = SearchByGeo

    useEffect(()=>{
        if(!authToken){
            navigate('/login')
        }else{
            dispatch(userDetails(authToken));
            dispatch(NearByUsers(authToken));
        }
        // eslint-disable-next-line
    },[authToken, message])

    useEffect(()=>{
        if(error){
            toast.error(error)
        }
    },[error])

    useEffect(()=>{
        if(detailsError){
            toast.error(detailsError)
        }
    },[detailsError])

    useEffect(()=>{
        if(message){
            toast.success(message)
        }
    },[message])

    useEffect(()=>{
        if(errorUsers){
            toast.error(errorUsers)
        }
    },[errorUsers])

    useEffect(()=>{
        if(errorSearchUsers){
            toast.error(errorSearchUsers)
        }
    },[errorSearchUsers])

    const longitudeRef = useRef()
    const latitudeRef = useRef()

    const handleIncognitoMode = (e) => {
        e.preventDefault()
        dispatch(
            IncognitoStatus(Cookie.get('authToken'))
        )
    }

    const handleSearch = (e) => {
        e.preventDefault()

        const enteredLatitude = latitudeRef.current.value;
        const enteredLongitude = longitudeRef.current.value;
              
        dispatch(searchUsers(enteredLatitude, enteredLongitude, Cookie.get('authToken')))
    }

    return (
        <div>
            <ToastContainer 
                position="bottom-right"  
                autoClose={5000}
            />

            <Headers  userInfo={info}  handlerAuthToken={(result)=>setAuthToken(result)} />

            <div className='loader'>
                {(loading || detailsLoading || loadingUsers || loadingSearchUsers) && <ThreeDots
                    color="#002A5D"
                    height={100}
                    width={100}
                />}
            </div>
            
            {
                info &&
                <div className='incognitoOption'>
                    <div>
                        <label htmlFor='incognito'>Incognito Mode</label>
                        <input type='checkbox' id='incognito' defaultChecked={info.incognito} onChange={handleIncognitoMode}  />
                    </div>
                </div> 
            }

            <div className='near-by-users'>
                <h1>Near By Users (in the radius of 100 kms)</h1>
                <div className='users-container'>
                    {
                        users && users.map(user=>(
                            <UserCards key={user._id} user={user} />
                        ))
                    }
                </div>
            </div>

            <div className='searchUsers'>
                <h1>Search By Geo Coordinates</h1>
                <div className='searchBox'>
                    
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
                    <div>
                        <button onClick={handleSearch}>Search</button>
                    </div>
                </div>
                <hr />

                {
                    SearchUsers ?
                    SearchUsers.length === 0 ? 
                    <h2>No Result Found</h2> :
                    <div>
                        <h2>{SearchUsers.length} Result Found...</h2>
                        <div className='users-container'>
                            {SearchUsers.map((user)=>(
                                <UserCards key={user._id} user={user} />
                            ))}
                        </div>
                    </div>:<></>
                }
            </div>
            
        </div>
    )
}

export default MapScreen