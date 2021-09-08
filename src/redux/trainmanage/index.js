import { GET_TRAINLIST_REQUEST, GET_TRAINLIST_SUCCESS, GET_TRAINLIST_FAILURE } from "../../pages/TrainManage/trainmanage_redux"

const defaultState = {
    loading:false,
    message: '',
    data:[
        {
            "key":1,
            "trainId": "K108",
            "startStation": "深圳",
            "endStation": "北京",
            "startTime": "07:00:00",
            "endTime": "23:00:00",
            "acrossDays": 1,
            "stationInfo": "[{\"acrossDays\":0,\"station\":\"深圳\",\"time\":\"07:00\"},{\"acrossDays\":0,\"station\":\"济南\",\"time\":\"10:00\"},{\"acrossDays\":1,\"station\":\"北京\",\"time\":\"23:00\"}]",
            "seatInfo": "[{\"num\":10,\"type\":\"硬座\"},{\"num\":5,\"type\":\"无座\"}]"
        },
        {
            "key":2,
            "trainId": "K109",
            "startStation": "武汉",
            "endStation": "哈尔滨",
            "startTime": "07:00:00",
            "endTime": "22:30:00",
            "acrossDays": 1,
            "stationInfo": "[{\"acrossDays\":0,\"station\":\"武汉\",\"time\":\"07:00\"},{\"acrossDays\":0,\"station\":\"济南\",\"time\":\"20:00\"},{\"acrossDays\":1,\"station\":\"天津\",\"time\":\"11:30\"},{\"acrossDays\":1,\"station\":\"哈尔滨\",\"time\":\"22:30\"}]",
            "seatInfo": "[{\"num\":10,\"type\":\"硬座\"},{\"num\":5,\"type\":\"硬卧\"}]"
        }
    ],
}

const trainmanage = (state = defaultState, action) => {
    switch (action.type) {
        case GET_TRAINLIST_REQUEST:
            return {
                ...state,
                message: GET_TRAINLIST_REQUEST,
                loading: true,
            };
        case GET_TRAINLIST_SUCCESS:
            return {
                ...state,
                message: GET_TRAINLIST_SUCCESS,
                loading: false,
                data: action.data
            }
        case GET_TRAINLIST_FAILURE:
            return {
                ...state,
                message: GET_TRAINLIST_FAILURE,
                loading: false,
            }
        default:
            return state;
    }
};
export default trainmanage;