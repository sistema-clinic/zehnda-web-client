import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useIntl } from 'react-intl';
import { FloatLabel } from 'primereact/floatlabel';
import { Toast } from 'primereact/toast';
import Logger from '@/utils/log/logging';
import { doPasswordReset } from '@firebaseapi/authUtil';
import { motion } from "motion/react";
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/Toast';

const Forgot: React.FC = () => {
    const [email, setEmail] = useState('');
    const [isEmailInvalid, setEmailIsInvalid] = useState(false);
    const [isResetting, setIsResetting] = useState(false);
    const { toast, show } = useToast();
    const {messages} = useIntl();
    const log = Logger.getInstance();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if(email === '') {    
            show('warn', String(messages.forgot_empty_email));
            setEmailIsInvalid(true);
            return false;
        }
        if (!emailRegex.test(email)) {
            show('warn', String(messages.forgot_invalid_email));
            setEmailIsInvalid(true);
            return false;
        }

        setIsResetting(true);
        doPasswordReset(email)
        .then(() => {
            show('success', String(messages.forgot_email_sent))
            setEmail("");
            setIsResetting(false);
        })
        .catch((err: any) => {
            switch (err.code) {
                case 'auth/user-not-found':
                    show('warn', String(messages.login_user_not_found));
                    break;
                case 'auth/invalid-email':
                    show('warn', String(messages.login_invalid_email_check));
                    break;
                default:
                    show('warn', String(messages.login_error));
                    break;
            }
            setIsResetting(false);
            log.error(err);
        })

    };

    const onKeyDown = () => {
        setEmailIsInvalid(false);
    };

    return (
        <>
            <Toast ref={toast} />
            <main className="w-full h-[calc(100vh-9rem)] flex flex-col self-center place-content-center place-items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="text-left space-y-3 lg:p-6 lg:w-96 sm:w-80 w-80 lg:shadow-xl lg:border rounded-xl">
                        <div className="text-left space-y-3 lg:w-96 sm:w-80 w-80">
                            <h2 className='text-3xl'>{String(messages.forgot_title)}</h2>             
                        </div>
                        <form onSubmit={onSubmit} className="space-y-5">
                            <div className="pt-4">
                                <FloatLabel>
                                    <InputText
                                        id="txtEmail"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        invalid = {isEmailInvalid}
                                        onKeyDown={onKeyDown}
                                        className="w-full"
                                    />
                                    <label htmlFor="txtEmail">{String(messages.forgot_email)}</label>
                                </FloatLabel>
                            </div>
                            <div className="py-1">                             
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    onHoverStart={event => {}}
                                    onHoverEnd={event => {}}>
                                    <Button
                                        type="submit"
                                        label={String(messages.forgot_submit)}
                                        className="w-full mt-3"
                                        loading={isResetting}
                                    />
                                </motion.div>
                            </div>
                        </form>
                        <div className="flex">
                            <Link className='text-sm text-purple-500 font-medium' to={'/login'}>{String(messages.forgot_return)}</Link>
                        </div>
                    </div>
                    
                </motion.div>
            </main>
        </>
    );
};

export default Forgot;
