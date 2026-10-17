/**********************************************************
 * Descripción: Store de redux toolkit
 * Desarrolador: Carlos Morante
 * Feha: 20 Diciembre 2024
***********************************************************/
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

//Importante: Se debe importar el reducer que se va a utilizar, 
// Nota: Aqui se estan usando barrel files con el fin de tener un solo punto de importación
// para los reducers
import reducers from './reducers';

// Configuración del store de redux toolkit
const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false,  immutableCheck: false })
    
  });
  
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>() 
export default store;