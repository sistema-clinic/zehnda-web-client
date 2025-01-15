import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { useIntl } from 'react-intl';
import { getUserInfo, setBreadCrumb } from '@/global/redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/global/redux/store';
import Logger from '@/utils/log/logging';
import { motion } from 'motion/react';
import { useAuth } from '@/contexts/auth/auth';

interface ProfileFormData {
    first_name: string;
    last_name: string;
    email: string;
    uid: string;
    gender_type: string;
    phone_number?: string;
}

const Profile: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const log = Logger.getInstance();
    const userInfo = useSelector((state: any) => state.userReducer);
    const user : any = useAuth()
    
    const [formData, setFormData] = useState<ProfileFormData>({
        first_name: '',
        last_name: '',
        email: '',
        uid: '',
        gender_type: '',
        phone_number: ''
    });
    const {messages} = useIntl();

    const authGender = [
        { label: String(messages.profile_gender_male), value: 'MALE' },
        { label: String(messages.profile_gender_female), value: 'FEMALE' },
        { label: String(messages.profile_gender_other), value: 'OTHER' }
    ];

    const breadItems = [{ label: String(messages.profile_profile) }];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(getUserInfo({uid: user.currentUser.uid, token: user.currentUser.accessToken}))
    };

    useEffect(() => {
        try {
            log.log("userInfo: ", userInfo)
            log.log("user: ", user)
        }
        catch (exc) {
            log.error(exc);
        }
    }, [userInfo]);

    useEffect(() => {
        try {
            dispatch(setBreadCrumb({breadCrumb : breadItems}))
        } 
        catch (exc) {
            log.error(exc);
        }

    }, []);
    
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="mt-10 flex items-center justify-center">
                    <div className="bg-transparent p-1 w-full lg:max-w-xl sm:max-w-lg">
                        <h2 className="text-xl font-bold mb-4 text-center">
                            {String(messages.profile_title)}
                        </h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                            <div className="flex flex-col">
                                <FloatLabel>
                                    <InputText
                                        id="first_name"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleInputChange}
                                        className="w-full"
                                    />
                                    <label htmlFor="txtUsername">{String(messages.profile_fname)}</label>
                                </FloatLabel>
                            </div>

                            <div className="flex flex-col">
                                <FloatLabel>
                                    <InputText
                                        id="last_name"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleInputChange}
                                        className="w-full md:w-20rem"
                                    />
                                    <label htmlFor="txtUsername">{String(messages.profile_lname)}</label>
                                </FloatLabel>
                            </div>

                            <div className="flex flex-col">
                                <FloatLabel>
                                    <InputText
                                        id="email"
                                        name="email"
                                        disabled={true}
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full md:w-20rem"
                                        type="email"
                                    />
                                    <label htmlFor="txtUsername">{String(messages.profile_email)}</label>
                                </FloatLabel>
                            </div>

                            <div className="flex flex-col">
                                <FloatLabel>
                                    <InputText
                                        id="phone_number"
                                        name="phone_number"
                                        value={formData.phone_number}
                                        onChange={handleInputChange}
                                        className="w-full md:w-20rem"
                                    />
                                    <label htmlFor="txtUsername">{String(messages.profile_phone)}</label>
                                </FloatLabel>
                            </div>


                            <div className="flex flex-col gap-2">
                                <Dropdown
                                    id="gender_type"
                                    name="gender_type"
                                    value={formData.gender_type}
                                    options={authGender}
                                    placeholder={String(messages.profile_gender_select)}
                                    onChange={(e) => setFormData(prev => ({ ...prev, gender_type: e.value }))}
                                    className="w-full md:w-20rem"
                                />
                            </div>

                            <Button 
                                type="submit" 
                                label={String(messages.profile_save)}
                                className="w-full md:w-20rem mt-4"
                            />
                        </form>
                    </div>
                </div>     
            </motion.div>  
        </>

    );
};

export default Profile;