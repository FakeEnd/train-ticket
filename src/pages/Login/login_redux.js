import { message } from "antd";
import Axios from "axios";
import qs from 'qs';

import { LOGIN_URL } from "../../constants/requestURL";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';


export const onLogin = ({ username, password}) => (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    return Axios.post(LOGIN_URL, qs.stringify({ username, password })).then(
        res => res.data
    ).then(res => {
        if (res.code === 0) {
            window.sessionStorage.setItem('Token', res.data.token)
            message.info("登录成功")
            dispatch({ type: LOGIN_SUCCESS, token:res.data.token});            
        } else {
            dispatch({ type: LOGIN_FAILURE });
            message.error('登陆失败：' + res.message)
        }
    }).catch(err => {
        dispatch({ type: LOGIN_FAILURE });
        console.error(err);
        message.error('登陆失败，请求异常');
    })
}