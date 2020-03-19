
import axios from 'axios';

import * as actionTypes from './actionTypes';

import {tokenConfig} from '../Actions/authActions';


// ARTICLES_LOADING
const setArticlesLoading = () => {
    return {
        type: actionTypes.ARTICLES_LOADING
    }
}



//GET ALL ARTICLES
export const getAllArticles = () => async (dispatch) => {
    dispatch(setArticlesLoading());
    const res = await axios.get('http://localhost:8080/articles');
    // console.log(res.data);
    
    dispatch({
        type: actionTypes.GET_ALL_ARTICLES,
        payload: res.data.data.articles
    });
}



// ADD ARTICLES
export const addArticle = (title, author, details) => async (dispatch, getState) => {
    
    const config = tokenConfig(getState);

    const res = await axios.post('http://localhost:8080/articles', {
        title,
        author,
        details
    }, config);
    
    dispatch({
        type: actionTypes.ADD_ARTICLE,
        payload: res.data.data.article
    })
}


//EDIT ARTICLE
export const editArticle = (updatedArticle, id) => async (dispatch, getState) => {

    const config = tokenConfig(getState);

    const res = await axios.patch(`http://localhost:8080/articles/${id}`, {
        ...updatedArticle
    }, config);


    dispatch ({
        type: actionTypes.EDIT_ARTICLE,
        payload: res.data.data.article
    })
}

//DELETE ARTICLE
export const deleteArticle = (id) => async (dispatch, getState) => {

    const config = tokenConfig(getState);

    axios.delete(`http://localhost:8080/articles/${id}`, config);
    
    dispatch ({
        type: actionTypes.DELETE_ARTICLE,
        payload: id
    });
}


