import  React, { useContext,  useEffect, useState } from "react";
import { auth } from "@firebaseapi/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useAppDispatch } from '@redux/store'
import { useSelector } from "react-redux";
import Logger from "@utils/log/logging";
import { getAuthInfo } from "@/utils/firebaseapi/redux/slice";

const AuthContext = React.createContext({});

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [isEmailUser, setIsEmailUser] = useState(false);
    const [isGoogleUser, setIsGoogleUser] = useState(false);
    const [loading, setLoading] = useState(true);
    const [internalUserdata, setInternalUserdata] = useState(null);
    const log = Logger.getInstance();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, []);
      
    const userInternalAuth = useSelector((state : any) => state.authReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setInternalUserdata(userInternalAuth)
        log.log("userInternalAuth: ", userInternalAuth)
      }, [userInternalAuth]);
      
    async function initializeUser(user: any) {    
        log.log(user)
        if (user) {
            setCurrentUser({ ...user });
            const isEmail: boolean = user.providerData.some(
                (provider: { providerId: string }) => provider.providerId === "password"
            );
            if(isEmail)
                setIsEmailUser(isEmail);
            else
                setIsGoogleUser(!isEmail)

            setUserLoggedIn(true);

            await dispatch(getAuthInfo({uid : user.uid, token: user.accessToken}))
        }
        else{
            setCurrentUser(null);
            setUserLoggedIn(false);
        }    
        setLoading(false);         
    }

    const authValue = {
        userLoggedIn,
        isEmailUser,
        isGoogleUser,
        currentUser,
        setCurrentUser,
        internalUserdata
      };

    return (
        <AuthContext.Provider value = {authValue}>
            {!loading && children}
        </AuthContext.Provider>
    )
}