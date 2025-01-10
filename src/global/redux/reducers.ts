import { combineReducers } from 'redux';
import commonReducer from './slice'
import modules from '../../components/global/redux/reducers';
import utils from '../../utils/global/redux/reducers'; 

const reducersModules = {
    ...modules, 
    ...utils, 
    commonReducer
};

const reducers = combineReducers(reducersModules);
export default reducers;