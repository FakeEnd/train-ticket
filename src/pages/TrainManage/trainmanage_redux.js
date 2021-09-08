import { message } from "antd";
import Axios from "axios";

import { TRAIN_LIST } from "../../constants/requestURL";

export const GET_TRAINLIST_REQUEST = 'GET_TRAINLIST_REQUEST';
export const GET_TRAINLIST_SUCCESS = 'GET_TRAINLIST_SUCCESS';
export const GET_TRAINLIST_FAILURE = 'GET_TRAINLIST_FAILURE';

export const ADD_TRAINLIST_REQUEST = 'ADD_TRAINLIST_REQUEST';
export const ADD_TRAINLIST_SUCCESS = 'ADD_TRAINLIST_SUCCESS';
export const ADD_TRAINLIST_FAILURE = 'ADD_TRAINLIST_FAILURE';

export const DELETE_TRAINLIST_REQUEST = 'DELETE_TRAINLIST_REQUEST';
export const DELETE_TRAINLIST_SUCCESS = 'DELETE_TRAINLIST_SUCCESS';
export const DELETE_TRAINLIST_FAILURE = 'DELETE_TRAINLIST_FAILURE';

// const stationInfo = [{"acrossDays":0,"station":"深圳","time":"07:00"},{"acrossDays":1,"station":"哈尔滨","time":"22:30"}], 
// const seatInfo = [{"num":10,"type":"硬座"},{"num":5,"type":"硬卧"}]

export const gettrainlist = () => (dispatch) => {
    dispatch({ type: GET_TRAINLIST_REQUEST });
    return Axios.get(TRAIN_LIST,{
        headers: {
            'token': window.sessionStorage.getItem('Token')
        }
    }).then(
        res => res.data
    ).then(res => {
        if (res.code === 0) {
            let newlist = res.data.map((item, index) => {
                return {
                    ...item,
                    key: index
                }
            })
            // message.info("获取成功")
            dispatch({ type: GET_TRAINLIST_SUCCESS, data: newlist });
        } else {
            dispatch({ type: GET_TRAINLIST_FAILURE });
            message.error('获取失败：' + res.message)
        }
    }).catch(err => {
        dispatch({ type: GET_TRAINLIST_FAILURE });
        console.error(err);
        message.error('获取失败，请求异常');
    })
}