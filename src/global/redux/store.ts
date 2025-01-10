import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import reducers from './reducers';

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false,  immutableCheck: false })
    
  });
  
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>() 
export default store;