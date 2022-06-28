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

export const IncognitoModeReducer = (state = {}, action) => {
    switch (action.type) {
        case PUT_INCOGNITO_MODE_REQUEST:
            return { loading: true }
        case PUT_INCOGNITO_MODE_SUCCESS:
            return { loading: false, message: action.payload }
        case PUT_INCOGNITO_MODE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const UserDetailReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_USER_DETAILS_REQUEST:
            return { loading: true }
        case GET_USER_DETAILS_SUCCESS:
            return { loading: false, userDetails: action.payload }
        case GET_USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const GetNearByUsersReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_NEAR_BY_USERS_REQUEST:
            return { loading: true }
        case GET_NEAR_BY_USERS_SUCCESS:
            return { loading: false, users: action.payload }
        case GET_NEAR_BY_USERS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const UploadCsvFileReducer = (state = {}, action) => {
    switch (action.type) {
        case UPLOAD_FILE_REQUEST:
            return { loading: true }
        case UPLOAD_FILE_SUCCESS:
            return { loading: false, message: action.payload }
        case UPLOAD_FILE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const SearchByGeoReducer = (state = {}, action) => {
    switch (action.type) {
        case SEARCH_USERS_REQUEST:
            return { loading: true }
        case SEARCH_USERS_SUCCESS:
            return { loading: false, users: action.payload }
        case SEARCH_USERS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}