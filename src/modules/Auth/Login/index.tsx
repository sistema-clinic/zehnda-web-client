/**********************************************************
 * Componente: LoginPage
 * Desarrolador: Carlos Morante
 * Feha: 26 Diciembre 2024
***********************************************************/
import Login from '@/components/Auth/Login';
import { useAuth } from '@/contexts/auth/auth';
import { Navigate } from 'react-router-dom';
import Loader from '@/components/Simple/Loader';

import logo from '@assets/logo.png';

/**
 * Modulo para log in
 * @returns 
 */
const LoginPage: React.FC = () => {
    const user : any = useAuth()

    return (
        <>
            {user && user.currentUser && (<Navigate to={'/main'} replace={true} />)}

            {user && user.currentUser === null ?
                <>
                    <header className="w-full h-20 bg-white flex items-center">
                        <img src={logo} className="left-0 pl-4 h-10" alt="Logo" />
                    </header>
                    <Login />
                </>
                :
                <Loader />}         

        </>
    );
}

export default LoginPage;