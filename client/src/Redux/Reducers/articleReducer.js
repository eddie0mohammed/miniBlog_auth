
import * as actionTypes from '../Actions/actionTypes';

const initialState = {

    articles: [],
    loading: false

}

const articleReducer = (state = initialState, action) => {

    switch(action.type){

        case (actionTypes.GET_ALL_ARTICLES):
            return {
                ...state,
                articles: action.payload,
                loading: false
            }

        case (actionTypes.ADD_ARTICLE):
            return {
                ...state,
                articles: [...state.articles, action.payload]
            }

        case (actionTypes.EDIT_ARTICLE):
            const index = state.articles.findIndex(elem => elem._id === action.payload._id);
            const currentArticles = state.articles;
            // const specificArticle = currentArticles.filter(elem => elem.id === action.payload.id)[0];
            const updatedArticle = {...action.payload}
            currentArticles[index] = updatedArticle
        
            
            return {
                ...state,
                articles: currentArticles
            }

        
        case (actionTypes.DELETE_ARTICLE):
            const filteredArticles = state.articles.filter(elem => elem.id !== action.payload);
            return {
                ...state,
                articles: filteredArticles
            }


        case (actionTypes.ARTICLES_LOADING):
            return {
                ...state,
                loading: true
            }


        default:
            return state;
    }
}

export default articleReducer;