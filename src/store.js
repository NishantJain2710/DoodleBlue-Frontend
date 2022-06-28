import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { 
    userLoginReducer,
    userRegisterReducer
} from './reducers/Authentication';

import {
    IncognitoModeReducer,
    UserDetailReducer,
    GetNearByUsersReducer,
    UploadCsvFileReducer,
    SearchByGeoReducer
} from './reducers/UserDetails';

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    IncognitoMode: IncognitoModeReducer,
    UserDetail: UserDetailReducer,
    GetNearByUsers: GetNearByUsersReducer,
    UploadCsvFile: UploadCsvFileReducer,
    SearchByGeo: SearchByGeoReducer
})

const initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store