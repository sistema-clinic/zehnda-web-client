import { useAuth } from "@/contexts/auth/auth";
import { motion } from "motion/react";
import { Avatar } from "primereact/avatar";
import { useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { FileUpload, FileUploadErrorEvent, FileUploadSelectEvent, FileUploadUploadEvent } from 'primereact/fileupload';
import Logger from "@/utils/log/logging";
import userImg from '../../../assets/user.svg'
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import TransparentLoader from "@/components/Simple/TransparentLoader";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, refreshPicture, setBreadCrumb, setPicture } from "@/global/redux/actions";
import { AppDispatch } from "@/global/redux/store";

const ChangePicture: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const {messages} = useIntl();
    const userInfo = useSelector((state: any) => state.userReducer.user);
    const [image, setImage] = useState<string>(userImg);
    const [isLoading, setIsLoading] = useState(false);
    const [readyToUpdate, setReadyToUpdate] = useState(false);
    const [readyToRemove, setReadyToRemove] = useState(false);
    const [hideRemove, setHideRemove] = useState(false);
    const [message, setMessage] = useState(String(messages.change_pic_file_max));
    const [mime, setMime] = useState('');
    const user : any = useAuth()
    const log = Logger.getInstance();
    const toast = useRef<Toast>(null);

    const show = (severityType : "success" | "info" | "warn" | "error" | "secondary" | "contrast", message: string) => {
        toast.current?.show({
            severity: severityType,
            summary: String(messages.warning),
            detail: message,
            life: 5000
        });
    };

    const breadItems = [{ label: String(messages.change_pic_title) }];
    useEffect(() => {
        setIsLoading(true)
        dispatch(setBreadCrumb({breadCrumb : breadItems}))
        dispatch(getUserInfo({uid: user.currentUser.uid, token: user.currentUser.accessToken}))   
        log.log('userInfo: ', userInfo)
    },[])

    useEffect(() => {
        try {              
            if(userInfo && userInfo.uid) {
                setImage(userInfo?.photoUrl ? userInfo.photoUrl : userImg)
            }
            setIsLoading(false)
        }
        catch (exc) {
            log.error(exc);
        }
    }, [userInfo]);

    const onSelect = (e: FileUploadSelectEvent) => {
        try {
            
            if(e.files.length > 0){
                log.log('onSelect', e)
                setMessage(String(messages.change_pic_file_clic))
                setHideRemove(true)
            }
        } 
        catch (error) {
            log.error(error) 
        }
    }

    const onValidationFail = (file: File) => {
        try {
            if(file.size > 100000) {
                show('error', String(messages.change_pic_file_ex))
                setMessage(String(messages.change_pic_file_max))
                setHideRemove(false)
                return true
            }
            setIsLoading(false)
            log.log('onValidationFail', file)
        } 
        catch (error) {
            log.error(error)
            
        }
    }

    const cancelImage = () => {
        setReadyToUpdate(false)
        setMessage(String(messages.change_pic_file_max))
        setImage(userInfo?.photoUrl ? userInfo.photoUrl : userImg)
        setHideRemove(false)
        setReadyToRemove(false)
    }

    const saveImage = async () => {
        try {
            setIsLoading(true)
            let picRes = await dispatch(setPicture({uid: user.currentUser.uid, pictureUrl: image, mime: mime, token: user.currentUser.accessToken}))
            if(picRes && picRes.payload && picRes.payload.result && picRes.payload.result.success){             
                dispatch(refreshPicture({user : {photoUrl: picRes.payload.user.photoUrl }}))
                setReadyToUpdate(false)
                show('success', String(messages.change_pic_file_change_success))
                setMessage(String(messages.change_pic_file_max))          
            }
            else{
                setReadyToUpdate(false)
                setMessage(String(messages.change_pic_file_max))
                show('error', String(messages.change_pic_file_error))
            }
            setIsLoading(false) 
            setHideRemove(false)
        } 
        catch (error) {
            log.error(error)
        }
    }

    const onUpload = (e:FileUploadUploadEvent) => {
        try {
            show('success', String(messages.change_pic_file_uploaded))
            setReadyToUpdate(true)
            setMessage(String(messages.change_pic_change_question))      
            setIsLoading(false)   
            
            if(e.files.length > 0){
                let mimeType = e.files[0].type
                setMime(mimeType)
            }

            if(e.xhr.response){
                const response = JSON.parse(e.xhr.response)
                setImage(response.fileUrl ? response.fileUrl : userImg)
            }
            
            log.log('onUpload', e)
        } 
        catch (error) {
            log.error(error)
            
        }
    };

    const onError = (e : FileUploadErrorEvent) => {
        try {
            show('error', String(messages.change_pic_file_error))
            setIsLoading(false)
            setHideRemove(false)
        } 
        catch (error) {
            log.error(error)    
        }
    };

    const onBeforeSend = (event: any) => {
        event.formData.append("uid", user.currentUser.uid);
        event.formData.append("token", user.currentUser.accessToken);
        setIsLoading(true)
    };

    const onReadyToRemove = async () => {
        try {
            setReadyToRemove(true)
            setMessage(String(messages.change_pic_remove_question))   
        } 
        catch (error) {
            log.error(error)    
        }
    }

    const removeImage = async () => {
        try {
            let userImage: string = ''
            if(!user?.currentUser?.photoURL){
                setImage(userImg)
            }
            else {
                setImage(user?.currentUser?.photoURL)
                userImage = user?.currentUser?.photoURL
            }

            setIsLoading(true)
            let picRes = await dispatch(setPicture({uid: user.currentUser.uid, pictureUrl: userImage, mime: mime, token: user.currentUser.accessToken}))
            if(picRes && picRes.payload && picRes.payload.result && picRes.payload.result.success){  
                dispatch(refreshPicture({user : {photoUrl: userImage}}))
                show('success', String(messages.change_pic_file_removed_success))
            }
            else {
                show('error', String(messages.change_pic_file_error))
            }
            setIsLoading(false)
            setReadyToRemove(false)
        } 
        catch (error) {
            log.error(error)
        }
    }

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
                <div className="mt-10 gap-4 flex flex-col items-center justify-center">
                    <div className="bg-transparent p-1 w-full lg:max-w-xl sm:max-w-lg">
                        <h2 className="text-xl font-bold mb-4 text-center">
                            {String(messages.change_pic_title)}
                        </h2>
                    </div>
                    <div className="flex flex-col">
                        <Avatar size="xlarge"
                            style={{ cursor: 'pointer' }} 
                            image={image}
                            shape="circle" 
                            pt = {{ 
                                root: { style: {
                                    width: '200px',
                                    height: '200px',
                                } },
                                image: { style: {
                                    cursor: 'pointer'
                                } }
                            }}
                        />
                    </div>
                    
                    <div className="flex gap-2">
                        {(!readyToUpdate && !readyToRemove ) && (
                            <>
                                <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        onHoverStart={event => {}}
                                        onHoverEnd={event => {}}>
                                    <FileUpload 
                                        mode="basic" 
                                        name="pictureUpload" 
                                        url= {`${import.meta.env.VITE_API_SERVER}/upload`} 
                                        accept="image/*" 
                                        maxFileSize={100000} 
                                        onUpload={onUpload} 
                                        chooseLabel = {String(messages.change_pic_choose)}
                                        onSelect = {onSelect}
                                        onError = {onError}
                                        onValidationFail = {onValidationFail}
                                        onBeforeSend = {onBeforeSend}
                                    />
                                </motion.div>
                                {!hideRemove && (
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    onHoverStart={event => {}}
                                    onHoverEnd={event => {}} >
                                    <Button 
                                        type="button" 
                                        severity="danger"
                                        onClick={onReadyToRemove}
                                        label={String(messages.change_pic_remove_picure)}
                                        icon="pi pi-times"
                                        
                                    />
                                </motion.div>

                                )}
                            </>
                        )}
                        {readyToUpdate && (
                            <>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    onHoverStart={event => {}}
                                    onHoverEnd={event => {}} >
                                    <Button 
                                        type="button" 
                                        onClick={saveImage}
                                        label={String(messages.change_pic_save)}
                                        icon="pi pi-check"
                                        
                                    />
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    onHoverStart={event => {}}
                                    onHoverEnd={event => {}}>
                                    <Button 
                                        type="button" 
                                        onClick={cancelImage}
                                        label={String(messages.change_pic_cancel)}
                                        severity="secondary"
                                        icon="pi pi-times"
                                    />
                                </motion.div>
                            </>
                        
                        )}
                        {readyToRemove && (
                            <>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    onHoverStart={event => {}}
                                    onHoverEnd={event => {}} >
                                    <Button 
                                        type="button" 
                                        onClick={removeImage}
                                        label={String(messages.change_pic_save)}
                                        icon="pi pi-check"
                                        
                                    />
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    onHoverStart={event => {}}
                                    onHoverEnd={event => {}}>
                                    <Button 
                                        type="button" 
                                        onClick={cancelImage}
                                        label={String(messages.change_pic_cancel)}
                                        severity="secondary"
                                        icon="pi pi-times"
                                    />
                                </motion.div>
                            </>
                        
                        )}        
                    </div>
                    <span className="text-base">{message}</span>
                </div>
            </motion.div>

            <Toast ref={toast} />
        </>
    );
}
export default ChangePicture;
