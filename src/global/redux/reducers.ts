import { combineReducers } from 'redux';
import commonReducer from './slice'
import components from '../../components/global/redux/reducers';
import utils from '../../utils/global/redux/reducers'; 
import modules from '../../modules/global/redux/reducers';

const reducersModules = {
    ...components, 
    ...utils, 
    ...modules,
    commonReducer
};

const reducers = combineReducers(reducersModules);
export default reducers;