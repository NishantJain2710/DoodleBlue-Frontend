import {
    PUT_INCOGNITO_MODE_FAIL,
    PUT_INCOGNITO_MODE_REQUEST,
    PUT_INCOGNITO_MODE_SUCCESS,
    GET_USER_DETAILS_REQUEST,
    GET_USER_DETAILS_SUCCESS,
    GET_USER_DETAILS_FAIL,
    GET_NEAR_BY_USERS_REQUEST,
    GET_NEAR_BY_USERS_SUCCESS,
    GET_NEAR_BY_USERS_FAIL,
    UPLOAD_FILE_REQUEST,
    UPLOAD_FILE_SUCCESS,
    UPLOAD_FILE_FAIL,
    SEARCH_USERS_REQUEST,
    SEARCH_USERS_SUCCESS,
    SEARCH_USERS_FAIL
} from '../constants/UserDetails';

import axios from 'axios';
import {BASEURL} from '../config';

export const IncognitoStatus = (authToken) => async (dispatch) => {
    try {
        dispatch({
            type: PUT_INCOGNITO_MODE_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization':authToken
            }
        }

        const { data } = await axios.put(`${BASEURL}/user/incognito/mode`, {}, config)

        dispatch({
            type: PUT_INCOGNITO_MODE_SUCCESS,
            payload: data[0].message,
        })

    } catch (error) {
        dispatch({
            type: PUT_INCOGNITO_MODE_FAIL,
            payload: error.response && error.response.data[0].message ? error.response.data[0].message : error.message
        })
    }
}

export const userDetails = (authToken) => async (dispatch) => {
    try {
        dispatch({
            type: GET_USER_DETAILS_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization':authToken
            }
        }

        const { data } = await axios.get(`${BASEURL}/user/me`, config)

        dispatch({
            type: GET_USER_DETAILS_SUCCESS,
            payload: data[0].data,
        })

    } catch (error) {
        dispatch({
            type: GET_USER_DETAILS_FAIL,
            payload: error.response && error.response.data[0].message ? error.response.data[0].message : error.message
        })
    }
}

export const NearByUsers = (authToken) => async (dispatch) => {
    try {
        dispatch({
            type: GET_NEAR_BY_USERS_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization':authToken
            }
        }

        const { data } = await axios.get(`${BASEURL}/user/nearby/100`, config)

        dispatch({
            type: GET_NEAR_BY_USERS_SUCCESS,
            payload: data[0].data,
        })

    } catch (error) {
        dispatch({
            type: GET_NEAR_BY_USERS_FAIL,
            payload: error.response && error.response.data[0].message ? error.response.data[0].message : error.message
        })
    }
}

export const UploadFileData = (File) => async (dispatch) => {
    try {
        dispatch({
            type: UPLOAD_FILE_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }
        var bodyFormData = new FormData();
        bodyFormData.append('uploadcsv', File)

        const { data } = await axios.post(`${BASEURL}/admin/upload/csv`, bodyFormData, config)

        dispatch({
            type: UPLOAD_FILE_SUCCESS,
            payload: data[0].message,
        })

    } catch (error) {
        dispatch({
            type: UPLOAD_FILE_FAIL,
            payload: error.response && error.response.data[0].message ? error.response.data[0].message : error.message
        })
    }
}

export const searchUsers = (lat, lon, authToken) => async (dispatch) => {
    try {
        dispatch({
            type: SEARCH_USERS_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization':authToken
            }
        }

        const { data } = await axios.get(`${BASEURL}/user/lon/${lon}/lat/${lat}`,  config)

        dispatch({
            type: SEARCH_USERS_SUCCESS,
            payload: data[0].data,
        })

    } catch (error) {
        dispatch({
            type: SEARCH_USERS_FAIL,
            payload: error.response && error.response.data[0].message ? error.response.data[0].message : error.message
        })
    }
}