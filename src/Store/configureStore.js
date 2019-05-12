import { createStore, combineReducers } from 'redux';
import LanguageReducer from './Reducers/LanguageReducer'

let mainReducer=combineReducers({
    language:LanguageReducer
});

export default createStore(mainReducer)