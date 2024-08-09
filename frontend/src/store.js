import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import authReducer from './slices/authSlice';

import userReducer from './slices/userSlice';

import videoReducer from './slices/videoSlice';


const reducer = combineReducers({
    
    authState: authReducer,
    userState: userReducer,
    videos: videoReducer
})


const store = configureStore({
    reducer,
    middleware: [thunk]
})

export default store;