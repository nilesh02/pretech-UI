import {createStore,combineReducers} from 'redux';
import rootReducer from '../reducers/reducers';

// const finalReducer=combineReducers({
//     places: rootReducer
// });

const configureStore = () =>{
    return createStore(rootReducer);
}

export default configureStore;