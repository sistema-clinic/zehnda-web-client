/**********************************************************
 * Componente: Reset
 * Desarrolador: Carlos Morante
 * Feha: 16 Diciembre 2024
***********************************************************/
import React, { useRef, useState, useEffect } from 'react';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useIntl } from 'react-intl';
import { FloatLabel } from 'primereact/floatlabel';
import { Toast } from 'primereact/toast';
import Logger from '@/utils/log/logging';
import { doConfirmPasswordReset, doVerifyPasswordResetCode } from '@firebaseapi/authUtil';
import { motion } from "motion/react";
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/Toast';

/**
 * Componente de restablecimiento de contraseña
 * @param param0 
 * @returns 
 */
const Reset: React.FC<{ code : string }> = ({code}) => {
    const [isChanged, setIsChanged] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordInvalid, setPasswordIsInvalid] = useState(false);
    const [isConfPasswordInvalid, setConfPasswordIsInvalid] = useState(false);
    const [isResetting, setIsResetting] = useState(false);
    const { toast, show } = useToast();
    const lblPasswordRef = useRef(null);
    const lblConfPasswordRef = useRef(null);
    const {messages} = useIntl();
    const log = Logger.getInstance();
    const [authModeMessage, setAuthModeMessage] = useState("");

    useEffect(() => {
        try {
            doVerifyPasswordResetCode(code)
                .then((email) => {
                    setIsChanged(false);
                    setAuthModeMessage(String(messages.reset_success))
                    log.log('email: ', email);
                }).catch((err) => {
                    setIsChanged(true);
                    switch(err.code) {
                        case 'auth/invalid-action-code':
                            setAuthModeMessage(String(messages.reset_invalid_action));                         
                            break;
                        case 'auth/expired-action-code':
                            setAuthModeMessage(String(messages.reset_expired_action));                         
                            break;
                        case 'auth/user-not-found':
                            setAuthModeMessage(String(messages.reset_user_not_found));
                            break;
                        default:
                            setAuthModeMessage(String(messages.reset_error_code));
                            break; 
                    }
                    log.error(err);
                })
        } 
        catch (exc) {
            log.error(exc);
        }
        
    }, []);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();  
        if(password === '') {    
            show('warn', String(messages.reset_empty_password));
            setPasswordIsInvalid(true);
            if (lblPasswordRef.current) {
                lblPasswordRef.current.style.color = '#e24c4c';
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
            show('warn', String(messages.reset_empty_password_confirm));
            setConfPasswordIsInvalid(true);
            if (lblConfPasswordRef.current) {
                lblConfPasswordRef.current.style.color = '#e24c4c';
            }
            return false;
        }

        if(password !== confirmPassword) {
            show('warn', String(messages.reset_not_match));
            setConfPasswordIsInvalid(true);
            if (lblConfPasswordRef.current) {
                lblConfPasswordRef.current.style.color = '#e24c4c';
            }
            return false;
        }
        if (!isResetting) {
            setIsResetting(true);
            doVerifyPasswordResetCode(code)
                .then((email) => {
                log.log('email: ', email);
                doConfirmPasswordReset(code, password)
                .then(() => {
                    show('success', String(messages.reset_success));
                    setIsResetting(false);
                    setIsChanged(true);
                })
                .catch((err) => {
                    switch(err.code) {
                        case 'auth/weak-password':
                            show('warn', String(messages.reset_weak_password));
                            break;
                        case 'auth/invalid-action-code':
                            show('warn', String(messages.reset_invalid_action));
                            break;
                        case 'auth/expired-action-code':
                            show('warn', String(messages.reset_expired_action));
                            break;
                        case 'auth/user-not-found':
                            show('warn', String(messages.reset_user_not_found));
                            break;
                        default:
                            show('warn', String(messages.reset_error_code));
                            break;  
                    }
    
                    log.log('Auth Error : ', err)
                    setIsResetting(false);
                })
            })
            .catch((err) => {
                switch(err.code) {
                    case 'auth/invalid-action-code':
                        show('warn', String(messages.reset_invalid_action));
                        break;
                    case 'auth/expired-action-code':
                        show('warn', String(messages.reset_expired_action));
                        break;
                    case 'auth/user-not-found':
                        show('warn', String(messages.reset_user_not_found));
                        break;
                    default:
                        show('warn', String(messages.reset_error_code));
                        break;  
                }

                log.log('Auth Error: ', err)
                setIsResetting(false);
            }) ;
        }

    };

    const onKeyDown = (id: string) => {
        if(id === 'txtPassword'){
            if (lblPasswordRef.current) {
                lblPasswordRef.current.style.color = '#6b7280';
            }
            setPasswordIsInvalid(false);   
        }

        if(id === 'txtConfirmPassword'){
            if (lblConfPasswordRef.current) {
                lblConfPasswordRef.current.style.color = '#6b7280';
            }
            setConfPasswordIsInvalid(false);   
        }
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                
                <main className="w-full h-[calc(100vh-9rem)] flex flex-col self-center place-content-center place-items-center">
                    {!isChanged ? 
                        <div className="space-y-5 p-6 shadow-xl lg:border rounded-xl">
                            <div className="text-left space-y-3 lg:w-96 sm:w-80 w-80">
                                <h2 className='text-3xl'>{String(messages.reset_title)}</h2>             
                            </div>
                            <div className='form-login lg:w-96 sm:w-80 w-80'>
                                <form onSubmit={onSubmit}>
                                    <div className="space-y-8">
                                        <FloatLabel>
                                            <Password 
                                                className="w-max" 
                                                inputId="txtPassword" 
                                                value={password}
                                                onKeyDown={(e) => onKeyDown((e.target as HTMLInputElement).id)} 
                                                onChange={(e) => setPassword(e.target.value)}
                                                promptLabel={String(messages.reset_prompt_label)} 
                                                weakLabel={String(messages.reset_weak_label)} 
                                                mediumLabel={String(messages.reset_medium_label)} 
                                                strongLabel={String(messages.reset_strong_label)} 
                                                invalid={isPasswordInvalid}
                                                disabled={isResetting}
                                                pt={{ input: { className: 'lg:w-96 sm:w-80 w-80' }}} 
                                                toggleMask />
                                            <label ref={lblPasswordRef} htmlFor="txtPassword">{String(messages.reset_password)}</label>
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
                                                disabled={isResetting}
                                                toggleMask />
                                            <label ref={lblConfPasswordRef} htmlFor="txtConfPassword">{String(messages.reset_password_confirm)}</label>
                                        </FloatLabel>
                                    </div>
                                    <div className='mt-5'>
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            onHoverStart={event => {}}
                                            onHoverEnd={event => {}}>
                                            <Button disabled={isResetting} className="lg:w-96 sm:w-80 w-80" label={String(messages.reset_submit)} />                         
                                        </motion.div>
                                    </div>
                                    <div className="flex pt-4">
                                        <Link className='text-sm text-purple-500 font-medium' to={'/login'}>{String(messages.reset_return)}</Link>
                                    </div>
                                </form> 
                            </div>
                        </div>
                        :
                        <>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <h2 className='text-sm text-slate-500'>{authModeMessage}</h2>
                                <Link className='text-sm text-purple-500 font-medium' to={'/login'}>{String(messages.reset_return)}</Link>
                            </div>   
                        </>
                    }
                    <Toast ref={toast} />
                </main>
                
            </motion.div>
        </>
    );
};

export default Reset; 