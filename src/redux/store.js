import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './reducers'

const { composeWithDevTools } = require('redux-devtools-extension');
export default createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
        // other store enhancers if any
));