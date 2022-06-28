import {
    POST_LOGIN_FAIL,
    POST_LOGIN_REQUEST,
    POST_LOGIN_SUCCESS,
    POST_REGISTER_REQUEST,
    POST_REGISTER_SUCCESS,
    POST_REGISTER_FAIL
} from '../constants/Authentication';

import axios from 'axios';
import {BASEURL} from '../config';

export const login = (body) => async (dispatch) => {
    try {
        dispatch({
            type: POST_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`${BASEURL}/user/login`, body, config)

        dispatch({
            type: POST_LOGIN_SUCCESS,
            payload: data[0].data,
        })

    } catch (error) {
        dispatch({
            type: POST_LOGIN_FAIL,
            payload: error.response && error.response.data[0].message ? error.response.data[0].message : error.message
        })
    }
}

export const register = (body) => async (dispatch) => {
    try {
        dispatch({
            type: POST_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`${BASEURL}/user/register`, body, config)

        dispatch({
            type: POST_REGISTER_SUCCESS,
            payload: data[0].data,
        })

    } catch (error) {
        dispatch({
            type: POST_REGISTER_FAIL,
            payload: error.response && error.response.data[0].message ? error.response.data[0].message : error.message
        })
    }
}