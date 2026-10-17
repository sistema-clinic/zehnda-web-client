/**********************************************************
 * Componente: MainPage
 * Desarrolador: Carlos Morante
 * Feha: 20 Diciembre 2024
***********************************************************/
import Loader from '@/components/Simple/Loader';
import { useAuth } from '@/contexts/auth/auth';
import { changePage } from '@/global/redux/actions';
import { AppDispatch } from '@/global/redux/store';
import { auth } from '@/utils/firebaseapi/firebaseConfig';
import Logger from '@/utils/log/logging';
import Content from '@layout/Main/Content/index';
import Header from '@layout/Main/Header/index';
import SidebarMenu from '@layout/Main/Sidebar/index';
import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
const Profile = React.lazy(() => import('@/modules/User/Profile'));
const ChangePassword = React.lazy(() => import('@/modules/User/ChangePassword'));
const ChangePicture = React.lazy(() => import('@/modules/User/ChangePicture'));
const Contacts = React.lazy(() => import('@/modules/Contacts'));
const Dashboard = React.lazy(() => import('@/modules/Dashboard'));

/**
 * Modulo contenedor de la aplicación
 * @returns 
 */
const MainPage: React.FC = () => {
    const user : any = useAuth()
    const commonReducer = useSelector((state : any) => state.commonReducer);
    const log = Logger.getInstance();
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        try {       
            log.log('user: ', user);
            log.log('commonReducer: ', commonReducer);
            if(user.internalUserdata.id === -1){
                auth.signOut()
            }
            else {
                dispatch(changePage({page : 'dashboard'}))               
            }
        } 
        catch (exc) {
            log.error(exc);
        }
        
    }, []);

    return (
        <>
            {user && user.currentUser == null && (<Navigate to={'/login'} replace={true} />)}
            <div className='flex flex-row h-screen'>
                <SidebarMenu />
                
                <div className='flex flex-col w-full'>
                    <Header />                   
                    <div className="min-vh-100 flex-1">
                        {/*Aqui se cargan los modulos de la app usando lazy loading */}
                        <Content>
                            {commonReducer.page === 'profile' && <Suspense fallback={<Loader/>}><Profile /></Suspense>} 
                            {commonReducer.page === 'changePassword' && <Suspense fallback={<Loader/>}><ChangePassword /></Suspense>} 
                            {commonReducer.page === 'changePicture' && <Suspense fallback={<Loader/>}><ChangePicture /></Suspense>} 
                            {commonReducer.page === 'contacts' && <Suspense fallback={<Loader/>}><Contacts /></Suspense>} 
                            {commonReducer.page === 'dashboard' && <Suspense fallback={<Loader/>}><Dashboard /></Suspense>} 
                            {!commonReducer.page && <span>Selecciona una opción del menú</span>}
                        </Content>
                    </div>
                </div>
            </div>
        </>
    );  
}

export default MainPage;