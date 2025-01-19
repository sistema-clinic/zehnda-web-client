import Signin from '@/components/Auth/Signin';
import { useAuth } from '@/contexts/auth/auth';
import { Navigate } from 'react-router-dom';
import Loader from '@/components/Simple/Loader';

import logo from '@assets/logo.png';

const SigninPage: React.FC = () => {
    const user : any = useAuth()
    return (
        <>
            {user && user.currentUser && (<Navigate to={'/main'} replace={true} />)}

            {user && user.currentUser === null ?
                <>
                    <header className="w-full h-20 bg-white flex items-center">
                        <img src={logo} className="left-0 pl-4 h-10" alt="Logo" />
                    </header>
                    <Signin />
                </>
                :
                <Loader />}
        </>
    );
}

export default SigninPage;