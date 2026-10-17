/**********************************************************
 * Componente: authUtil
 * Desarrolador: Carlos Morante
 * Descripcion: Utilidades para autenticación con Firebase
 * Feha: 20 Diciembre 2024
***********************************************************/
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

/**
 *  Crea un usuario con correo y contraseña
 * @param email
 * @param password 
 * @returns 
 */
export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

/**
 * 
 * @param email 
 * @param password 
 * @returns 
 */
export const doSignInWithEmailAndPassword = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

/**
 * hace el login con google
 */
export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const authType = import.meta.env.VITE_AUTH_TYPE;
    const log = Logger.getInstance();

    //Ingresa con popup * redirect - revisar el archivo de variables de ambiente para cambiar el tipo de autenticación
    if (authType === "popup") {
        const result = await signInWithPopup(auth, provider);
        log.log('doSignInWithGoogle: ', result)
    } else if (authType === "redirect") {
        const result = await signInWithRedirect(auth, provider);
        log.log('doSignInWithGoogle: ', result)
    } 

};

/**
 * Hace un sign out
 * @returns 
 */
export const doSignOut = () => {
  return auth.signOut();
};

/**
 * permite hacer un reset de contraseña
 * @param email 
 * @returns 
 */
export const doPasswordReset = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

/**
 * permite cambiar una contraseña
 * @param password 
 * @returns 
 */
export const doPasswordChange = (password: string) => {
  return updatePassword(auth.currentUser, password);
};

/**
 * envia una verificación de email
 * @returns 
 */
export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/main`,
  });
};

/**
 * verifica el código de reset de contraseña
 * @param code 
 * @returns 
 */
export const doVerifyPasswordResetCode = (code: string) => {
  return verifyPasswordResetCode(auth, code);
};

/**
 * confirma el reset de contraseña
 * @param code 
 * @param password 
 * @returns 
 */
export const doConfirmPasswordReset = (code: string, password: string) => {
  return confirmPasswordReset(auth, code, password);
};

/**
 * actualiza el usuario actual
 * @param user 
 * @returns 
 */
export const doUpdateCurrentUser = (user: any) => { 
  return auth.updateCurrentUser(user)
}

/**
 * renueva un token
 */
export const renewToken = () => {
  const log = Logger.getInstance();
  auth.currentUser.getIdToken(true).then((token) => {
      log.log('token: ', token);
  }) 
}

/**
 * permite aplicar un código de acción de firebase
 * @param code 
 * @returns 
 */
export const doApplyActionCode = (code: string) => {
  return applyActionCode(auth, code);
}

