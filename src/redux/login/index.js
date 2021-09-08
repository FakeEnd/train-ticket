import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../../pages/Login/login_redux"

const isLogin = Boolean(window.sessionStorage.getItem('Token'))

const defaultState = {
    isLogin: isLogin,
    loading: false,
    message: '',
    token:''
}

const login = (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                message: LOGIN_REQUEST,
                loading: true,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLogin: true,
                message: LOGIN_SUCCESS,
                loading: false,
                token: action.token
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                isLogin: false,
                message: LOGIN_FAILURE,
                loading: false,
            }
        default:
            return state;
    }
};
export default login;