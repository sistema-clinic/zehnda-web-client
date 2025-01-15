import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth/auth';
import Logger from '@/utils/log/logging';
import SidebarMenu from '@layout/Main/Sidebar/index';
import Header from '@layout/Main/Header/index';
import Content from '@layout/Main/Content/index';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/global/redux/store';
import { changePage } from '@/global/redux/actions'
import Profile from '@/modules/User/Profile';
import ChangePassword from '@/modules/User/ChangePassword';

const MainPage: React.FC = () => {
    const user : any = useAuth()
    const navigate = useNavigate()
    const commonReducer = useSelector((state : any) => state.commonReducer);
    const log = Logger.getInstance();
    const dispatch: AppDispatch = useDispatch();
    
    useEffect(() => {
        try {
            log.log('user');
            log.log(user);
            log.log(commonReducer);
            dispatch(changePage({page : 'changePassword'}))
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
                        
                        <Content>
                            {commonReducer.page === 'profile' && <Profile />} 
                            {commonReducer.page === 'changePassword' && <ChangePassword />} 
                            {!commonReducer.page && <span>Selecciona una opción del menú</span>}
                        </Content>
                    </div>
                </div>
            </div>
        </>
    );  
}

export default MainPage;