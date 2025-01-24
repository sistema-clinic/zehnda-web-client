import { useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import Reset from "@/components/Auth/Reset";
import { useAuth } from "@/contexts/auth/auth";
import VerifyEmail from "@/components/Auth/VerifyEmail";
import logo from '@assets/logo.png';
import Loader from "@/components/Simple/Loader";
import { useIntl } from "react-intl";

const ApplyCodePage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const user : any = useAuth()
    const [mode] = useState<string | null>(searchParams.get('mode'));
    const [oobCode] = useState<string | null>(searchParams.get('oobCode'));
    const {messages} = useIntl();
    return (
        <>
            {user && user.currentUser && (<Navigate to={'/main'} replace={true} />)}

            {user && user.currentUser === null ?
                <>
                    <header className="w-full h-20 bg-white flex items-center">
                        <img src={logo} className="left-0 pl-4 h-10" alt="Logo" />
                    </header>
                    {mode === 'resetPassword' && oobCode ? (
                            <Reset code={oobCode} />
                        ) : mode === 'verifyEmail' && oobCode ? (
                            <VerifyEmail code={oobCode} />
                        ) : (
                            <div className="flex justify-center flex-col gap-4 items-center">
                                <h2 className='text-3xl sm:text-xl w-1/2 text-center mx-auto justify-center items-center'>{String(messages.apply_message)}</h2>
                            </div>
                    )}
                </>
                :
                <Loader />}            
        </>
    )
}

export default ApplyCodePage