import { auth } from "./firebaseConfig";
import Logger from "@utils/log/logging";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
  verifyPasswordResetCode,
  confirmPasswordReset, 
  applyActionCode

} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const authType = import.meta.env.VITE_AUTH_TYPE;
    const log = Logger.getInstance();

    if (authType === "popup") {
        const result = await signInWithPopup(auth, provider);
        log.log('doSignInWithGoogle: ', result)
    } else if (authType === "redirect") {
        const result = await signInWithRedirect(auth, provider);
        log.log('doSignInWithGoogle: ', result)
    } 

};

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password: string) => {
  return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/main`,
  });
};

export const doVerifyPasswordResetCode = (code: string) => {
  return verifyPasswordResetCode(auth, code);
};

export const doConfirmPasswordReset = (code: string, password: string) => {
  return confirmPasswordReset(auth, code, password);
};

export const doUpdateCurrentUser = (user: any) => { 
  return auth.updateCurrentUser(user)
}

export const renewToken = () => {
  const log = Logger.getInstance();
  auth.currentUser.getIdToken(true).then((token) => {
      log.log('token: ', token);
  }) 
}

export const doApplyActionCode = (code: string) => {
  return applyActionCode(auth, code);
}

