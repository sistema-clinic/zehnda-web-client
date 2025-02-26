/**********************************************************
 * Componente: Global Reducers
 * Description: Reducers combinados para store de redux toolkit
 * Desarrolador: Carlos Morante
 * Feha: 22 Diciembre 2024
***********************************************************/
import { combineReducers } from 'redux';
import commonReducer from './slice'
//TODO: Importar los reducers de los componentes cuando hay alguno
//import components from '../../components/global/redux/reducers';
import utils from '../../utils/global/redux/reducers'; 
import modules from '../../modules/global/redux/reducers';

const reducersModules = {
    //...components, 
    ...utils, 
    ...modules,
    commonReducer
};

const reducers = combineReducers(reducersModules);
export default reducers;