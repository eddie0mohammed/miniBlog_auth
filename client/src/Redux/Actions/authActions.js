
import axios from 'axios';

import * as actionTypes from './actionTypes';

import {returnErrors} from './errorActions';




//setup config/headers and token
export const tokenConfig = (getState) => {
    //get token from local storage
    const token = getState().auth.token;

    //headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    //if token, then add token to headers
    if (token){
        config.headers['x-auth-token'] = token;
    }

    return config;
}



//check token and load user
export const loadUser = () => async (dispatch, getState) => {

    //dispatch user loading
    dispatch({
        type: actionTypes.USER_LOADING
    });

    const config = tokenConfig(getState);

    try{

        const res = await axios.get('http://localhost:8080/auth/user', config);
        
        dispatch({
            type: actionTypes.USER_LOADED,
            payload: res.data
        })


    }catch(err){
        // console.log(err);
        dispatch(returnErrors(err.response.data, err.response.status));

        dispatch({
            type: actionTypes.AUTH_ERROR
        })
    }

}


//REGISGER
export const register = (name, email, password) => async (dispatch) => {

    //headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    //request body
    const body = JSON.stringify({name, email, password});

    try{
        const res = await axios.post('http://localhost:8080/users', body, config);

        dispatch({
            type: actionTypes.REGISTER_SUCCESS,
            payload: res.data
        });

    }catch(err){
        
        dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));

        dispatch({
            type: actionTypes.REGISTER_FAIL
        })
    }
}



//LOGIN
export const login = (email, password) => async (dispatch) => {

    //headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    //request body
    const body = JSON.stringify({email, password});

    try{

        const res = await axios.post('http://localhost:8080/auth', body, config);

        dispatch({
            type: actionTypes.LOGIN_SUCCESS,
            payload: res.data
        })



    }catch(err){
        
        dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));

        dispatch({
            type: actionTypes.LOGIN_FAIL
        });
    }
}



//LOGOUT
export const logout = () => {
    return {
        type: actionTypes.LOGOUT_SUCCESS
    }
}