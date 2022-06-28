import React,{ useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './UploadUsers.css'

import { useDispatch, useSelector } from 'react-redux';

import { UploadFileData } from '../../actions/UserDetails';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {ThreeDots} from "react-loader-spinner";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadUsers = () => {
    const dispatch = useDispatch();
    const [uploads, setUploads] = useState()

    const UploadCsvFile = useSelector(state => state.UploadCsvFile)
    const { loading, error, message } = UploadCsvFile

    useEffect(()=>{
        if(error){
            toast.error(error)
        }
    },[error])

    useEffect(()=>{
        if(message){
            toast.success(message)
        }
    },[message])

    const handleUpload = (e) => {
        e.preventDefault()
        dispatch(UploadFileData(uploads))
    }


    return (
        <div className='upload-container'>
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

            <div className='uploadCsv'>
                <div>
                    <label htmlFor='csv'>Upload CSV File</label>
                    <input type='file' id='csv' onChange={(e)=>{setUploads(e.target.files[0])}} />
                </div>
                <div>
                    {
                        uploads ? 
                        <button onClick={handleUpload}>Upload Data</button> :
                        <button disabled>Upload Data</button> 
                    }
                </div>
                <div>
                    <Link to={'/login'}>Login</Link> |  
                    <Link to={'/register'}> Register</Link>
                </div>
            </div>
        </div>
    )
}

export default UploadUsers