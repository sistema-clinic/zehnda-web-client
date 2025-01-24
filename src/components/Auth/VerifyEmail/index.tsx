import { motion } from 'motion/react';
import React, { useRef, useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import check from '@assets/vectors/check.svg'
import error from '@assets/vectors/error.svg'
import { Link, Navigate } from 'react-router-dom';
import { doApplyActionCode } from '@firebaseapi/authUtil'
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import Logger from '@/utils/log/logging';

const VerifyEmail: React.FC<{ code: string }> = ({ code: code }) => {
    const [isVerified, setIsVerified] = useState(true);
    const [startVerification, setStartVerification] = useState(true);
    const {messages} = useIntl();
    const navigate = useNavigate();
    const log = Logger.getInstance();
    useEffect(() => {
        if(!code || code === ''){
            navigate('/login');
        }
    }, []);

    const onClick = async (e : any) => {
        try {
            log.log(e);
            setStartVerification(false);
            doApplyActionCode(code).then(() => {
                setIsVerified(true);              
            }).catch((err: any) => {
                setIsVerified(false);
                log.error(err);     
            }) 
        } catch (error) {
            log.error(error);
        }
    }
    return (
        <>
            <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                {
                    startVerification ?
                    <div className="flex justify-center flex-col gap-4 items-center">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            onHoverStart={event => {}}
                            onHoverEnd={event => {}}>
                            <Button className="lg:w-96 sm:w-80 w-80" label={String(messages.verify_action)} onClick={onClick} />                         
                        </motion.div>
                    </div>
                    :
                    isVerified ?
                    <div className="flex justify-center flex-col gap-4 items-center">
                        <img src={check} alt="check" className='w-20 h-20'/>
                        <h2 className='text-xl lg:text-3xl w-1/2 text-center mx-aut justify-center items-center'>{String(messages.verify_message)}</h2>      
                        <div className="flex">
                            <Link className='text-sm text-purple-500 font-medium' to={'/login'}>{String(messages.verify_return)}</Link>
                        </div> 
                    </div>                
                    :
                    <div className="flex justify-center flex-col gap-4 items-center">
                        <img src={error} alt="error" className='w-20 h-20'/>
                        <h2 className='text-xl lg:text-3xl w-1/2 text-center mx-aut justify-center items-center'>{String(messages.verify_error)}</h2>      
                        <div className="flex">
                            <Link className='text-sm text-purple-500 font-medium' to={'/login'}>{String(messages.verify_return)}</Link>
                        </div> 
                    </div>                   
                }
            </motion.div>
        </>
    )
}

export default VerifyEmail