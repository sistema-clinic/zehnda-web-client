import { motion } from "motion/react";
import { FloatLabel } from "primereact/floatlabel";
import { Toast } from 'primereact/toast';
import { Password } from "primereact/password";
import { useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import './index.scss'
import { Button } from "primereact/button";
import { doPasswordChange, doSignInWithEmailAndPassword } from "@/utils/firebaseapi/authUtil";
import { useAuth } from "@/contexts/auth/auth";
import Logger from "@/utils/log/logging";
import TransparentLoader from "@/components/Simple/TransparentLoader";
import { setBreadCrumb } from "@/global/redux/actions";
import { AppDispatch } from "@/global/redux/store";
import { useDispatch } from "react-redux";

interface PasswordFormData {
    original_password: string;
    new_password: string;
    confirm_password: string;
}

const ChangePassword: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
    const [isNewPasswordInvalid, setNewIsPasswordInvalid] = useState(false);
    const [isConfirmPasswordInvalid, setConfirmIsPasswordInvalid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {messages} = useIntl();
    const toast = useRef<Toast>(null);
    const lblPasswordRef = useRef(null);
    const lblNewPasswordRef = useRef(null);
    const lblConfirmPasswordRef = useRef(null);
    const user : any = useAuth()
    const log = Logger.getInstance();

    const show = (severityType : "success" | "info" | "warn" | "error" | "secondary" | "contrast", message: string) => {
        toast.current?.show({
            severity: severityType,
            summary: String(messages.warning),
            detail: message,
            life: 3000
        });
    };

    const [formData, setFormData] = useState<PasswordFormData>({
        original_password: '',
        new_password: '',
        confirm_password: ''
    });

    const breadItems = [{ label: String(messages.change_password_title) }];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        try {
            dispatch(setBreadCrumb({breadCrumb : breadItems}))           
        } 
        catch (exc) {
            log.error(exc);
        }

    }, []);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(formData.original_password === '') {    
            show('warn', String(messages.change_password_empty_password));
            setIsPasswordInvalid(true);
            if (lblPasswordRef.current) {
                lblPasswordRef.current.style.color = '#e24c4c';
            }
            return false;
        }
        else{
            setIsPasswordInvalid(false);
            if (lblPasswordRef.current) {
                lblPasswordRef.current.style.color = '#6b7280'
            }
        }

        if(formData.new_password === '') {    
            show('warn', String(messages.change_password_empty_password));
            setNewIsPasswordInvalid(true);
            if (lblNewPasswordRef.current) {
                lblNewPasswordRef.current.style.color = '#e24c4c';
            }
            return false;
        }
        else{
            setNewIsPasswordInvalid(false);
            if (lblNewPasswordRef.current) {
                lblNewPasswordRef.current.style.color = '#6b7280'
            }
        }

        if(formData.confirm_password === '') {    
            show('warn', String(messages.change_password_empty_password));
            setConfirmIsPasswordInvalid(true);
            if (lblConfirmPasswordRef.current) {
                lblConfirmPasswordRef.current.style.color = '#e24c4c';
            }
            return false;
        }
        else{
            setConfirmIsPasswordInvalid(false);
            if (lblConfirmPasswordRef.current) {
                lblConfirmPasswordRef.current.style.color = '#6b7280'
            }
        }
        if(formData.new_password !== formData.confirm_password) {
            show('warn', String(messages.change_password_not_match));
            setNewIsPasswordInvalid(true);
            if (lblNewPasswordRef.current) {
                lblNewPasswordRef.current.style.color = '#e24c4c';
            }
            return false;
        }
        setIsLoading(true)
        doSignInWithEmailAndPassword(user.currentUser.email, formData.original_password).then((result) => {
            log.log('enter')
            doPasswordChange(formData.new_password)
                .then(() => {
                    show('success', String(messages.change_password_success))
                    setFormData({
                        original_password: '',
                        new_password: '',
                        confirm_password: ''
                    })
                    setIsLoading(false)
                })
                .catch((error) => {   
                    switch(error.code) {
                        case 'auth/invalid-credential':
                            show('warn', String(messages.change_password_invalid))                       
                            break;
                        case 'auth/weak-password':
                            show('warn', String(messages.change_password_weak_password))                            
                            break;
                        case 'auth/user-not-found':
                            show('warn', String(messages.change_password_user_not_found))     
                            break;
                        default:
                            show('warn', String(messages.change_password_error))     
                            break; 
                    }
                log.error(error)
                setIsLoading(false)
            });

        })
        .catch((error) => {
            switch(error.code) {
                case 'auth/invalid-credential':
                    show('warn', String(messages.change_password_invalid))                       
                    break;
                case 'auth/weak-password':
                    show('warn', String(messages.change_password_weak_password))                            
                    break;
                case 'auth/user-not-found':
                    show('warn', String(messages.change_password_user_not_found))     
                    break;
                default:
                    show('warn', String(messages.change_password_error))     
                    break; 
            }
            log.error(error)
            setIsLoading(false)
        });
    };

    const onKeyDown = (id: any) => {
        if(id === 'txtPassword'){
            if (lblPasswordRef.current) {
                lblPasswordRef.current.style.color = '#6b7280';
            }
            setIsPasswordInvalid(false);   
        }

        if(id === 'txtNewPassword'){
            if (lblNewPasswordRef.current) {
                lblNewPasswordRef.current.style.color = '#6b7280';
            }
            setNewIsPasswordInvalid(false);   
        }

        
        if(id === 'txtConfirmPassword'){
            if (lblConfirmPasswordRef.current) {
                lblConfirmPasswordRef.current.style.color = '#6b7280';
            }
            setConfirmIsPasswordInvalid(false);   
        }
    };
    return (
        <>
            <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative"    
                >
                {isLoading && (
                    <div className="overlay">
                        <TransparentLoader />
                    </div>
                )}
                <div className="mt-10 flex items-center justify-center">
                    <div className="bg-transparent p-1 w-full lg:max-w-xl sm:max-w-lg">
                        <h2 className="text-xl font-bold mb-4 text-center">
                            {String(messages.change_password_title)}
                        </h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                            <div className="flex flex-col">
                                <FloatLabel>
                                    <Password
                                        inputId="txtPassword"
                                        name="original_password"
                                        value={formData.original_password}
                                        onKeyDown={(e) => onKeyDown((e.target as HTMLInputElement).id)} 
                                        onChange={handleInputChange}
                                        className="w-full"
                                        invalid={isPasswordInvalid}
                                        pt={{ input: { className: 'w-full' }}} 
                                        feedback={false} 
                                        toggleMask
                                    />
                                    <label ref={lblPasswordRef} htmlFor="txtPassword">{String(messages.change_password_original_password)}</label>
                                </FloatLabel>
                            </div>  

                            <div className="flex flex-col">
                                <FloatLabel>
                                    <Password
                                        inputId="txtNewPassword"
                                        name="new_password"
                                        value={formData.new_password}
                                        onKeyDown={(e) => onKeyDown((e.target as HTMLInputElement).id)} 
                                        onChange={handleInputChange}
                                        promptLabel={String(messages.change_password_prompt_label)} 
                                        weakLabel={String(messages.change_password_weak_label)} 
                                        mediumLabel={String(messages.change_password_medium_label)} 
                                        strongLabel={String(messages.change_password_strong_label)} 
                                        className="w-full"
                                        invalid={isNewPasswordInvalid}
                                        pt={{ input: { className: 'w-full' }}} 
                                        toggleMask
                                    />
                                    <label ref={lblNewPasswordRef} htmlFor="txtNewPassword">{String(messages.change_password_new_password)}</label>
                                </FloatLabel>
                            </div>

                            <div className="flex flex-col">
                                <FloatLabel>
                                    <Password
                                        inputId="txtConfirmPassword"
                                        name="confirm_password"
                                        value={formData.confirm_password}
                                        onKeyDown={(e) => onKeyDown((e.target as HTMLInputElement).id)} 
                                        onChange={handleInputChange}                                     
                                        className="w-full"
                                        invalid={isConfirmPasswordInvalid}
                                        pt={{ input: { className: 'w-full' }}} 
                                        feedback={false} 
                                        toggleMask
                                    />
                                    <label ref={lblConfirmPasswordRef} htmlFor="txtConfirmPassword">{String(messages.change_password_confirm_password)}</label>
                                </FloatLabel>
                            </div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                onHoverStart={event => {}}
                                onHoverEnd={event => {}}>
                                <Button 
                                    type="submit" 
                                    label={String(messages.profile_save)}
                                    className="w-full md:w-20rem mt-4"
                                    disabled={isPasswordInvalid || isNewPasswordInvalid || isConfirmPasswordInvalid}
                                />
                            </motion.div>
                        </form>
                    </div>                   
                </div>
                <Toast ref={toast} />
            </motion.div>
        </>
    )
}

export default ChangePassword;