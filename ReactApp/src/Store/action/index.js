import * as firebase from 'firebase/app';
import Firebase from '../../Config/firebase';

const facebook_login = () => {
    return (dispatch) => {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(function (result) {
                var user = result.user;
                dispatch({ type: 'FACEBOOK_LOGIN', uid: user.uid, userName: user.displayName, photoURL: user.photoURL, loginStatus: true })
            })
            .catch(function (error) {
                console.log(error.message);
            });
    }
}
const facebook_logout = () => {
    return (dispatch) => {
        firebase.auth().signOut()
            .then(function () {
                dispatch({ type: 'FACEBOOK_LOGOUT', uid: '', userName: '', photoURL: '', loginStatus: false })
            })
            .catch(function (error) {
                console.log(error.message);
            });
    }
}


const setSearchedItem = (data) => {
    return (dispatch) => {
        dispatch({ type: 'SET_SEARCHED_ITEM', data: data })
    }
}

const setSelectedLoc = (data) => {
    return (dispatch) => {
        dispatch({ type: 'SET_SELECTED_LOC', data: data })
    }
}
const setSelectedCategory = (data) => {
    return (dispatch) => {
        dispatch({ type: 'SET_SELECTED_CATEGORY', data: data })
    }
}
const setMinPrice = (data) => {
    return (dispatch) => {
        dispatch({ type: 'SET_MIN_PRICE', data: data })
    }
}
const setMaxPrice = (data) => {
    return (dispatch) => {
        dispatch({ type: 'SET_MAX_PRICE', data: data })
    }
}
export {
    facebook_login,
    facebook_logout,
    setSearchedItem,
    setSelectedLoc,
    setSelectedCategory,
    setMinPrice,
    setMaxPrice,
}