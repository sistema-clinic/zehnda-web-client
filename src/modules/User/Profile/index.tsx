import React, { useState, useEffect, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { useIntl } from 'react-intl';
import { getCountries, getUserInfo, resetResult, resetUser, setBreadCrumb, setUserInfo, setUserLanguage } from '@/global/redux/actions';
import { Toast } from 'primereact/toast';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/global/redux/store';
import Logger from '@/utils/log/logging';
import { motion } from 'motion/react';
import { useAuth } from '@/contexts/auth/auth';
import { InputMask } from 'primereact/inputmask';
import CountryFlags from '@/components/Simple/CountryFlags';
import TransparentLoader from '@/components/Simple/TransparentLoader';
import './index.scss'

interface ProfileFormData {
    first_name: string;
    last_name: string;
    email: string;
    uid: string;
    gender_type: string;
    country_code: string;
    language_code: String;
    phone_number?: string;
}

const Profile: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const log = Logger.getInstance();
    const userInfo = useSelector((state: any) => state.userReducer.user);
    const countries = useSelector((state: any) => state.commonReducer.countries);
    const lblLNameRef = useRef(null);
    const user : any = useAuth()
    const toast = useRef<Toast>(null);
    const [isFNameInvalid, setIsFNameInvalid] = useState(false);
    const [isEmailInvalid, setIsEmailInvalid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {messages} = useIntl();

    const show = (severityType : "success" | "info" | "warn" | "error" | "secondary" | "contrast", message: string) => {
        toast.current?.show({
            severity: severityType,
            summary: String(messages.warning),
            detail: message,
            life: 5000
        });
    };  

    const [formData, setFormData] = useState<ProfileFormData>({
        first_name: '',
        last_name: '',
        email: '',
        uid: '',
        gender_type: '',
        country_code: '',
        language_code: '',
        phone_number: ''
    });
    

    const authGender = [
        { label: String(messages.profile_gender_male), value: 'MALE' },
        { label: String(messages.profile_gender_female), value: 'FEMALE' },
        { label: String(messages.profile_gender_other), value: 'OTHER' },
        { label: String(messages.profile_gender_unknown), value: 'UNKNOWN' }
    ];

    const languages = [
        { label: String(messages.profile_language_english), value: 'en' },
        { label: String(messages.profile_language_spanish), value: 'es' },

    ];

    const breadItems = [{ label: String(messages.profile_profile) }];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(formData.email === '') {    
            show('warn', String(messages.profile_invalid_email))
            setIsEmailInvalid(true);
            return false;
        }
        else if (!emailRegex.test(formData.email)) {
            show('warn', String(messages.profile_invalid_email));
            setIsEmailInvalid(true);
            return false;
        }
        else{
            setIsEmailInvalid(false);
        }

        if(formData.first_name === '') {    
            show('warn', String(messages.profile_required_first_name))
            setIsFNameInvalid(true);
            if (lblLNameRef.current) {
                lblLNameRef.current.style.color = '#e24c4c'
            }
            return false;
        }
        else{
            setIsFNameInvalid(false);
            if (lblLNameRef.current) {
                lblLNameRef.current.style.color = '#6b7280'
            }
        }
        setIsLoading(true)
        //await new Promise(resolve => setTimeout(resolve, 5000));
        
        let result = await dispatch(setUserInfo({
            uid: user.currentUser.uid, 
            fName: formData.first_name, 
            lName: formData.last_name, 
            countryCode: formData.country_code, 
            phoneNumber: formData.phone_number, 
            gender: formData.gender_type, 
            languageCode: formData.language_code, 
            token: user.currentUser.accessToken
        }))   

        setIsLoading(false)
        dispatch(setUserLanguage({language : formData.language_code || 'en'}))
        dispatch(getCountries({token: user.currentUser.accessToken, code: formData.language_code})) 

        if(result){
            if(result.payload.result.success === true){
                show('success', String(messages.profile_save_success));
            }     
            else {
                show('error', String(messages.profile_save_error));
            }  
        }        
        dispatch(resetResult({result : false}))
        
        log.log(result)
        
    };

    const onKeyDown = (id : string) => {  
        if(id === 'txtFName'){
            setIsFNameInvalid(false);
            lblLNameRef.current.style.color = '#6b7280'
        }  
    }

    useEffect(() => {
        try {   
            if(userInfo && userInfo.uid) {
                setFormData({
                    first_name: userInfo.firstName || '',
                    last_name: userInfo.lastName || '',
                    email: userInfo.email || '',
                    uid: userInfo.uid || '',
                    country_code: userInfo.countryCode || '',
                    gender_type: userInfo.gender || '',
                    language_code: userInfo.language,
                    phone_number: userInfo.phoneNumber  ? userInfo.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') : undefined
                });
          
            }
            /*  new Promise(resolve => setTimeout(resolve, 5000)).then(() => {
                setIsLoading(false);
            }); */
            
            setIsLoading(false)
        }
        catch (exc) {
            log.error(exc);
        }
    }, [userInfo]);

    useEffect(() => {
        try {
            setIsLoading(true)
            dispatch(setBreadCrumb({breadCrumb : breadItems}))
            dispatch(getUserInfo({uid: user.currentUser.uid, token: user.currentUser.accessToken}))            
        } 
        catch (exc) {
            log.error(exc);
        }

    }, []);
        
    useEffect(() => {
        return () => {
            try {
                setFormData({
                    first_name: '',
                    last_name: '',
                    email: '',
                    uid: '',
                    gender_type: '',
                    country_code: '',
                    language_code: '',
                    phone_number: ''
                });
                setIsFNameInvalid(false);
                setIsEmailInvalid(false);
                dispatch(resetUser({}))
            } catch (exc) {
                log.error(exc);
            }
        }
    }, []);

    const selectedCountryTemplate = (option, props) => {
        if (option) {
            log.log('option: ', option)
            return (
                <div className="flex align-items-center space-x-2">
                    <CountryFlags code={option.code}/>
                    <label>{option.name}</label>
                    <label>+{option.areaCode}</label>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };
    const countryOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center space-x-2">
                <CountryFlags code={option.code} />  
                <label>{option.name}</label>
                <label>+{option.areaCode}</label>
            </div>
        );
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
                            {String(messages.profile_title)}
                        </h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                            <div className="flex flex-col">
                                <FloatLabel>
                                    <InputText
                                        id="txtEmail"
                                        name="email"
                                        disabled={true}
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full md:w-20rem"
                                        type="email"
                                        invalid={isEmailInvalid}
                                        
                                    />
                                    <label htmlFor="txtEmail">{String(messages.profile_email)}</label>
                                </FloatLabel>
                            </div>

                            <div className="flex flex-col">
                                <FloatLabel>
                                    <InputText
                                        id="txtFName"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleInputChange}
                                        className="w-full md:w-20rem"
                                        invalid={isFNameInvalid}
                                        maxLength={100}                                      
                                        onKeyDown={(e) => onKeyDown((e.target as HTMLInputElement).id)}
                                    />
                                    <label ref={lblLNameRef} htmlFor="txtFName">{String(messages.profile_fname)}</label>
                                </FloatLabel>
                            </div>

                            <div className="flex flex-col">
                                <FloatLabel>
                                    <InputText
                                        id="txtLName"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleInputChange}
                                        className="w-full md:w-20rem"
                                        maxLength={100}
                                    />
                                    <label htmlFor="txtLName">{String(messages.profile_lname)}</label>
                                </FloatLabel>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="p-float-label label" style={{fontSize: '12px', left: '0.75rem', color: '#6b7280', marginTop: '-20px'}} htmlFor="ddlCountryCode">{String(messages.profile_area_code)}</label>
                                <Dropdown
                                    id="ddlCountryCode"
                                    name="country_code"
                                    value={formData.country_code}
                                    options={countries}
                                    optionLabel="name"
                                    optionValue="code"
                                    valueTemplate={selectedCountryTemplate} 
                                    itemTemplate={countryOptionTemplate}
                                    placeholder={String(messages.profile_area_code_select)}
                                    onChange={(e) => setFormData(prev => ({ ...prev, country_code: e.value }))}
                                    className="w-full md:w-20rem"
                                    filter 
                                />
                                
                            </div>

                            <div className="flex flex-col">                              
                                <FloatLabel>                   
                                    <InputMask 
                                        id="txtPhoneNumber"
                                        name="phone_number"
                                        value={formData.phone_number}
                                        onChange={(e) => setFormData(prev => ({ ...prev, phone_number: e.target.value }))}
                                        className="w-full md:w-20rem"
                                        mask="(999) 999-9999"
                                        placeholder="(999) 999-9999"
                                        maxLength={20}
                                    />
                                    <label htmlFor="txtPhoneNumber">{String(messages.profile_phone)}</label>
                                </FloatLabel>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="p-float-label label" style={{fontSize: '12px', left: '0.75rem', color: '#6b7280', marginTop: '-20px'}} htmlFor="ddlGenderType">{String(messages.profile_gender_type)}</label>
                                <Dropdown
                                    id="ddlGenderType"
                                    name="gender_type"
                                    value={formData.gender_type}
                                    options={authGender}
                                    placeholder={String(messages.profile_gender_select)}
                                    onChange={(e) => setFormData(prev => ({ ...prev, gender_type: e.value }))}
                                    className="w-full md:w-20rem"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="p-float-label label" style={{fontSize: '12px', left: '0.75rem', color: '#6b7280', marginTop: '-20px'}} htmlFor="txtLanguage">{String(messages.profile_language)}</label>
                                <Dropdown
                                    id="ddlLanguage"
                                    name="language_code"
                                    value={formData.language_code}
                                    options={languages}
                                    placeholder={String(messages.profile_language_select)}
                                    onChange={(e) => setFormData(prev => ({ ...prev, language_code: e.value }))}
                                    className="w-full md:w-20rem"
                                />
                            </div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                onHoverStart={event => {}}
                                onHoverEnd={event => {}}>
                                <Button 
                                    type="submit" 
                                    label={String(messages.profile_save)}
                                    className="w-full md:w-20rem mt-4"
                                    disabled={isFNameInvalid || isEmailInvalid  }
                                />
                            </motion.div>
                        </form>
                    </div>
                </div>     
            </motion.div>  
            <Toast ref={toast} />
        </>

    );
};

export default Profile;