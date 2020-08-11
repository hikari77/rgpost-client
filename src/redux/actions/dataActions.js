import { SET_POSTS, LOADING_DATA, LIKE_POST, UNLIKE_POST, 
            DELETE_POST, SET_ERRORS, POST_POST, LOADING_UI, CLEAR_ERRORS, SET_POST, STOP_LOADING_UI} from '../types';
import axios from 'axios';


// get all posts
export const getPosts = () => dispatch => {
    dispatch({ type: LOADING_DATA });
    axios
        .get('/posts')
        .then(res => {
            dispatch({
                type: SET_POSTS,
                payload: res.data
            })
            dispatch({type: CLEAR_ERRORS})
        })
        .catch(err => {
            dispatch({
                type: SET_POSTS,
                payload: []
            })
        })
}

export const getPost = (postId) => dispatch => {
    dispatch({ type: LOADING_UI });
    axios
        .get(`/post/${postId}`)
        .then( res => {
            dispatch({
                type: SET_POST,
                payload: res.data
            });
            dispatch({ type: STOP_LOADING_UI})
        })
        .catch(err => console.log(err))
}


// post a post
export const postPost = (newPost) => (dispatch) => {
    dispatch({ type: LOADING_UI});
    axios
        .post('/post', newPost)
        .then(res => {
            dispatch({
                type: POST_POST,
                payload: res.data
            });
            dispatch(clearErrors());
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

// like a post
export const likePost = (postId) => dispatch => {
    axios
        .get(`/post/${postId}/like`)
        .then(res => {
            dispatch({
                type: LIKE_POST,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

// unlike a post
export const unlikePost = (postId) => dispatch => {
    axios
        .get(`/post/${postId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_POST,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const deletePost = (postId) => (dispatch) => {
    axios
        .delete(`/post/${postId}`)
        .then(()=>{
            dispatch({
                type: DELETE_POST,
                payload: postId
            })
        })
        .catch(err => console.log(err));
}

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}