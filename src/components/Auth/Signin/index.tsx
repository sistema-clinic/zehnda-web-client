/**********************************************************
 * Componente: Signin
 * Desarrolador: Carlos Morante
 * Feha: 16 Diciembre 2024
***********************************************************/
import React, { useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useIntl } from 'react-intl';
import { FloatLabel } from 'primereact/floatlabel';
import { Link } from 'react-router-dom';
import Logger from '@/utils/log/logging';
import { motion } from "motion/react"
import { Toast } from 'primereact/toast';
import { doCreateUserWithEmailAndPassword, doSendEmailVerification } from '@firebaseapi/authUtil'

import './index.scss';
import { useToast } from '@/hooks/Toast';

/**
 * Componente de creacion de usuario
 * @returns 
 */
const Signin: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoginInvalid, setLoginIsInvalid] = useState(false);
    const [isPasswordInvalid, setPasswordIsInvalid] = useState(false);
    const [isConfPasswordInvalid, setConfPasswordIsInvalid] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false)
    const lblPasswordRef = useRef(null);
    const lblConfPasswordRef = useRef(null);
    const {messages} = useIntl();
    const { toast, show } = useToast();
    const log = Logger.getInstance();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(username === '') {    
            show('warn', String(messages.signin_empty_email))
            setLoginIsInvalid(true);
            return false;
        }
        else if (!emailRegex.test(username)) {
            show('warn', String(messages.signin_invalid_email));
            setLoginIsInvalid(true);
            return false;
        }
        else{
            setLoginIsInvalid(false);
        }

        if(password === '') {    
            show('warn', String(messages.signin_empty_password))
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

        if(confirmPassword === '') {    
            show('warn', String(messages.signin_empty_password_confirm))
            setConfPasswordIsInvalid(true);
            if (lblConfPasswordRef.current) {
                lblConfPasswordRef.current.style.color = '#e24c4c'
            }
            return false;
        }
        else{
            setConfPasswordIsInvalid(false);
            if (lblConfPasswordRef.current) {
                lblConfPasswordRef.current.style.color = '#6b7280'
            }
        }

        if(password !== confirmPassword) {
            show('warn', String(messages.signin_not_match));
            setConfPasswordIsInvalid(true);
            if (lblConfPasswordRef.current) {
                lblConfPasswordRef.current.style.color = '#e24c4c'
            }
            return false;
        }
        else {
            setConfPasswordIsInvalid(false);
            if (lblConfPasswordRef.current) {
                lblConfPasswordRef.current.style.color = '#6b7280'
            }
        }
        
        if(!isRegistering) {
            setIsRegistering(true)
            await doCreateUserWithEmailAndPassword(username, password).catch(err => {
                switch(err.code) {
                    case 'auth/email-already-in-use':
                        show('warn', String(messages.signin_email_in_use));
                        break;
                    case 'auth/weak-password':
                        show('warn', String(messages.signin_weak_password));
                        break;
                    default:
                        show('warn', String(messages.signin_error));
                        break;  
                }

                log.log('Auth Error: ', err)
                setIsRegistering(false)
            })
            await doSendEmailVerification();
        }
        
        return true;
    }

    const onKeyDown = (id : string) => { 

        if(id === 'txtUsername'){
            setLoginIsInvalid(false);
        }
        
        if(id === 'txtPassword'){
            if (lblPasswordRef.current) {
                lblPasswordRef.current.style.color = '#6b7280'
            }
            setPasswordIsInvalid(false);   
        }

        if(id === 'txtConfirmPassword'){
            if (lblConfPasswordRef.current) {
                lblConfPasswordRef.current.style.color = '#6b7280'
            }
            setConfPasswordIsInvalid(false);   
        }
    }

    return (
        <> 
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <main className="w-full h-[calc(100vh-9rem)] flex flex-col self-center place-content-center place-items-center">
                    <div className="space-y-5 p-6 shadow-xl lg:border rounded-xl">
                        <div className="text-left space-y-3 lg:w-96 sm:w-80 w-80">
                            <h2 className='text-3xl'>{String(messages.signin_new)}</h2>             
                        </div>
                        <div className='form-login lg:w-96 sm:w-80 w-80'>
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
                                        <label htmlFor="txtUsername">{String(messages.signin_email)}</label>
                                    </FloatLabel>
                                    <FloatLabel>
                                        <Password 
                                            className="w-max" 
                                            inputId="txtPassword" 
                                            value={password}
                                            onKeyDown={(e) => onKeyDown((e.target as HTMLInputElement).id)} 
                                            onChange={(e) => setPassword(e.target.value)}
                                            promptLabel={String(messages.signin_prompt_label)} 
                                            weakLabel={String(messages.signin_weak_label)} 
                                            mediumLabel={String(messages.signin_medium_label)} 
                                            strongLabel={String(messages.signin_strong_label)} 
                                            invalid={isPasswordInvalid}
                                            pt={{ input: { className: 'lg:w-96 sm:w-80 w-80' }}} 
                                            toggleMask />
                                        <label ref={lblPasswordRef} htmlFor="txtPassword">{String(messages.signin_password)}</label>
                                    </FloatLabel>
                                    <FloatLabel>
                                        <Password 
                                            className="w-max" 
                                            inputId="txtConfirmPassword" 
                                            value={confirmPassword}
                                            autoComplete='off'                                           
                                            onKeyDown={(e) => onKeyDown((e.target as HTMLInputElement).id)} 
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            feedback={false} 
                                            invalid={isConfPasswordInvalid}
                                            pt={{ input: { className: 'lg:w-96 sm:w-80 w-80' }}} 
                                            toggleMask />
                                        <label ref={lblConfPasswordRef} htmlFor="txtConfPassword">{String(messages.signin_password_confirm)}</label>
                                    </FloatLabel>
                                </div>
                                <div className='mt-5'>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        onHoverStart={event => {}}
                                        onHoverEnd={event => {}}>
                                        <Button className="lg:w-96 sm:w-80 w-80" label={String(messages.signin_sign_up)} />                         
                                    </motion.div>
                                </div>
                                <div className="flex items-center justify-center gap-2 mt-5">
                                    <h2 className='text-sm text-slate-500'>{String(messages.signin_already_have)}</h2>
                                    <Link className='text-sm text-purple-500 font-medium' to={'/login'}>{String(messages.signin_continue)}</Link>
                                </div>
                            </form> 
                        </div>
                    </div>
                    <Toast ref={toast} />
                </main>
            </motion.div>
        </>
    );
}

export default Signin;
