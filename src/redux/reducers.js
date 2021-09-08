import { combineReducers } from 'redux';

import Login from './login';
import trainmanage from './trainmanage';

const rootReducer = combineReducers({
    Login,
    trainmanage
})

export default rootReducer;
