/**********************************************************
 * Componente: ForgotPage
 * Desarrolador: Carlos Morante
 * Feha: 26 Diciembre 2024
***********************************************************/
import { useAuth } from '@/contexts/auth/auth';
import Loader from '@/components/Simple/Loader';

import logo from '@assets/logo.png';
import Forgot from '@/components/Auth/Forgot';

/**
 * Modulo para contraseña olvidada
 * @returns 
 */
const ForgotPage: React.FC = () => {
    const user : any = useAuth()

    return (
        <>
            {user && user.currentUser === null ?
                <>
                    <header className="w-full h-20 bg-white flex items-center">
                        <img src={logo} className="left-0 pl-4 h-10" alt="Logo" />
                    </header>
                    <Forgot />
                </>
                :
                <Loader />}         

        </>
    );
}

export default ForgotPage;