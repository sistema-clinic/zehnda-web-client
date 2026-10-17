/**********************************************************
 * Componente: Session
 * Desarrolador: Carlos Morante
 * Feha: 20 Diciembre 2024
***********************************************************/
import { renewToken } from "../firebaseapi/authUtil";

/**
 * Clase utilitaria para manejar la sesión del usuario
 */
class Session {
    private static instance: Session;
    private constructor() {}

    /**
     * Obtiene la instancia de la sesión
     * @returns 
     */
    public static getInstance(): Session {
        if (!Session.instance) {
            Session.instance = new Session();
        }
        return Session.instance;
    }

    /**
     * Renueva la sesión del usuario
     */
    renewSession(): void {
        renewToken()    
    }
}

export default Session;