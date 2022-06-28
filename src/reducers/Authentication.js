import {
    POST_LOGIN_FAIL,
    POST_LOGIN_REQUEST,
    POST_LOGIN_SUCCESS,
    POST_REGISTER_REQUEST,
    POST_REGISTER_SUCCESS,
    POST_REGISTER_FAIL
} from '../constants/Authentication';

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case POST_LOGIN_REQUEST:
            return { loading: true }
        case POST_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case POST_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case POST_REGISTER_REQUEST:
            return { loading: true }
        case POST_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case POST_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}