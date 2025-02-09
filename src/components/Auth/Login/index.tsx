import React, { useEffect, useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useIntl } from 'react-intl';
import { FloatLabel } from 'primereact/floatlabel';
import { Link } from 'react-router-dom';
import { motion } from "motion/react"
import { Toast } from 'primereact/toast';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '@firebaseapi/authUtil'
import { useAuth } from '@/contexts/auth/auth';
import Logger from '@/utils/log/logging';
import { useToast } from "@/hooks/Toast";

import './index.scss';

const Login: React.FC = () => {
    const user : any = useAuth()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogingIn, setIsLoginIn] = useState(false)
    const [isLoginInvalid, setLoginIsInvalid] = useState(false);
    const [isPasswordInvalid, setPasswordIsInvalid] = useState(false);
    const lblPasswordRef = useRef(null);
    const {messages} = useIntl();
    const { toast, show } = useToast();
    const log = Logger.getInstance();

    useEffect(() => {
        try {
            log.log('user: ', user);
        } 
        catch (exc) {
            log.error(exc);
        }
        
    }, []);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()  
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(username === '') {    
            show('warn', String(messages.login_empty_username))
            setLoginIsInvalid(true);
            return false;
        }
        else if (!emailRegex.test(username)) {
            show('warn', String(messages.login_invalid_email));
            setLoginIsInvalid(true);
            return false;
        }
        else{
            setLoginIsInvalid(false);
        }

        if(password === '') {    
            show('warn', String(messages.login_empty_password))
            setPasswordIsInvalid(true);
            if (lblPasswordRef.current) {
                lblPasswordRef.current.style.color = '#e24c4c'
            }
            return false;
        }
        else{
            setPasswordIsInvalid(false);
            if (lblPasswordRef.current) {
                lblPasswordRef.current.style.color = '#6b7280'
            }
        }
        if (!isLogingIn) {
            setIsLoginIn(true)
            await doSignInWithEmailAndPassword(username, password).catch(err => {         
                switch (err.code) {
                    case 'auth/user-not-found':
                        show('warn', String(messages.login_user_not_found))
                        break;
                    case 'auth/wrong-password':
                        show('warn', String(messages.login_wrong_password))
                        break;
                    case 'auth/invalid-email':
                        show('warn', String(messages.login_invalid_email_check))
                        break;
                    case 'auth/invalid-credential':
                        show('warn', String(messages.login_creds_error))
                        break;
                    default:
                        show('warn', String(messages.login_error))
                        break;
                }

                log.log('Auth Error : ', err)
                setIsLoginIn(false)
            })
        }
    }

    const onKeyDown = (id : string) => {  
        if(id === 'txtUsername'){
            setLoginIsInvalid(false);
        }
        
        if(id === 'txtPassword'){
            setPasswordIsInvalid(false);   
            if (lblPasswordRef.current) {
                lblPasswordRef.current.style.color = '#6b7280'
            }
        }
    }

    const onGoogleSignIn = (e) => {
        e.preventDefault()
        if (!isLogingIn) {
            setIsLoginIn(true)
            doSignInWithGoogle().catch(err => {
                switch (err.code) {
                    case 'auth/popup-blocked:':
                        show('warn', String(messages.login_popup_blocked))
                        break;
                    case 'auth/invalid-credential':
                        show('warn', String(messages.login_invalid_credential))
                        break;
                    case 'auth/operation-not-allowed':
                        show('warn', String(messages.login_provider_not_enabled))
                        break;
                    case 'auth/account-exists-with-different-credential':
                        show('warn', String(messages.login_account_exists_with_different_credential))
                        break;
                    case 'auth/user-disabled':
                        show('warn', String(messages.login_user_disabled))
                        break;
                    case 'auth/internal-error:':
                        show('warn', String(messages.login_internal_error))
                        break;      
                    case 'auth/popup-closed-by-user':
                        show('warn', String(messages.login_popup_closed_by_user))
                        break;                
                    default:
                        show('warn', String(messages.login_error))
                        break;
                }
                setIsLoginIn(false)
            })
        }
    }

    return (
        <>  
            <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
            >
                <main className="w-full h-[calc(100vh-9rem)] flex flex-col self-center place-content-center place-items-center">        
                    <div className="lg:space-y-5 lg:p-6 lg:shadow-xl lg:border rounded-xl">
                        <div className="text-left space-y-3 lg:w-96 sm:w-80 w-80">
                            <h1 className='text-3xl'>{String(messages.login_login)}</h1>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <h2 className='text-sm text-slate-500'>{String(messages.login_have_account)}</h2>
                                <Link className='text-sm text-purple-500 font-medium' to={'/signin'}>{String(messages.login_sign_up)}</Link>
                            </div>                    
                        </div>
                        <div className='form-login lg:w-96 sm:w-80 w-80 pt-4'>
                            <form onSubmit={onSubmit}>  
                                <div className="space-y-8">
                                    <FloatLabel>
                                        <InputText 
                                            id="txtUsername" 
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)} 
                                            invalid={isLoginInvalid} 
                                            onKeyDown={(e) => onKeyDown((e.target as HTMLInputElement).id)}
                                            className="w-full"/>
                                        <label htmlFor="txtUsername">{String(messages.login_username)}</label>
                                    </FloatLabel>
                                    <FloatLabel>
                                        <Password                                         
                                            className="w-max" 
                                            inputId="txtPassword" 
                                            value={password}
                                            onKeyDown={(e) => onKeyDown((e.target as HTMLInputElement).id)} 
                                            onChange={(e) => setPassword(e.target.value)}
                                            feedback={false} 
                                            type='password'
                                            invalid={isPasswordInvalid}
                                            pt={{ input: { className: 'lg:w-96 sm:w-80 w-80'}}} 
                                            toggleMask />
                                        <label ref={lblPasswordRef} id="lblPassword" htmlFor="txtPassword">{String(messages.login_password)}</label>
                                    </FloatLabel>
                                </div>
                                
                                <div className="py-5">
                                    <Link className='text-sm text-purple-500 font-medium' to={'/forgot'}>{String(messages.login_forgot_password)}</Link>
                                </div>
                                
                                <div>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        onHoverStart={event => {}}
                                        onHoverEnd={event => {}}>
                                        <Button disabled={isLogingIn} className="lg:w-96 sm:w-80 w-80" label={String(messages.login_login)} />                         
                                    </motion.div>
                                </div>
                            </form>
                            <div className='flex flex-row text-center w-full my-4'>
                                <div className='border-b-2 mb-2.5 mr-2 w-full'></div>
                                    <h2 className='text-sm text-slate-500 w-fit'>{String(messages.login_or)}</h2>
                                <div className='border-b-2 mb-2.5 ml-2 w-full'></div>
                            </div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                onHoverStart={event => {}}
                                onHoverEnd={event => {}}>
                                <button
                                    disabled={isLogingIn}
                                    onClick={(e) => { onGoogleSignIn(e) }}
                                    className={`flex items-center justify-center gap-x-3 py-2.5 border rounded-lg lg:w-96 sm:w-80 w-80`}>
                                    <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_17_40)">
                                            <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
                                            <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
                                            <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04" />
                                            <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_17_40">
                                                <rect width="48" height="48" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    {isLogingIn ? String(messages.login_signing_in) :  String(messages.login_continue_google)}
                                </button>
                            </motion.div>
                            <Toast ref={toast} />
                        </div>               
                    </div>  
                                
                </main>   
            </motion.div>
    
        </>
    );
};

export default Login;