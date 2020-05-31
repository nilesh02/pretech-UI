import {createStore,applyMiddleware } from 'redux';
import rootReducer from '../reducers/reducers';
import thunk from "redux-thunk";

// const finalReducer=combineReducers({
//     places: rootReducer
// });

const configureStore = () =>{
    return createStore(rootReducer,applyMiddleware(thunk));
}

export default configureStore;