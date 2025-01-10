import Login from '@/components/Auth/Login';
import { useAuth } from '@/contexts/auth/auth';
import { Navigate } from 'react-router-dom';
import Logger from '@/utils/log/logging';
import Loader from '@/components/Loader';

import logo from '@assets/logo.png';
import Reset from '@/components/Auth/Reset';

const ResetPage: React.FC = () => {
    const user : any = useAuth()
    const log = Logger.getInstance();

    return (
        <>
            {user && user.currentUser && (<Navigate to={'/main'} replace={true} />)}

            {user && user.currentUser === null ?
                <>
                    <header className="w-full h-20 bg-white flex items-center">
                        <img src={logo} className="left-0 pl-4 h-10" alt="Logo" />
                    </header>
                    <Reset />
                </>
                :
                <Loader />}         

        </>
    );
}

export default ResetPage;