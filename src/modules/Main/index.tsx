import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth/auth';
import Logger from '@/utils/log/logging';
import SidebarMenu from '@/modules/Main/Sidebar/index';
import Header from '@/modules/Main/Header/index';
import { doSignOut } from '@/utils/firebaseapi/authUtil';

const MainPage: React.FC = () => {
    const user : any = useAuth()
    const navigate = useNavigate()

    const log = Logger.getInstance();
    useEffect(() => {
        try {
            log.log('user');
            log.log(user);
        } 
        catch (exc) {
            log.error(exc);
        }
        
    }, []);
    return (
        <>
            {user && user.currentUser == null && (<Navigate to={'/login'} replace={true} />)}
            <div className='flex h-screen'>
                <SidebarMenu />
                <div className="min-vh-100 w-full">
                    <Header />
                </div>
            </div>
        </>
    );  
}

export default MainPage;