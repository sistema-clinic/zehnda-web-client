import  React, { useContext,  useEffect, useState } from "react";
import { auth } from "@firebaseapi/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { getUser } from '@redux/actions'
import { useAppDispatch } from '@redux/store'
import { useSelector } from "react-redux";
import Logger from "@utils/log/logging";

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
    const log = Logger.getInstance();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
      }, []);
      
    const userInternalAuth = useSelector((state : any) => state.userReducer.userData);
    const dispatch = useAppDispatch();

    async function initializeUser(user: any) {

        log.log(userInternalAuth)
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
            //const userCred = await getRedirectResult(auth);
            dispatch(getUser({user : user, isLogin: user ? true : false, isloading: false}))
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
        userInternalAuth
      };

    return (
        <AuthContext.Provider value = {authValue}>
            {!loading && children}
        </AuthContext.Provider>
    )
}