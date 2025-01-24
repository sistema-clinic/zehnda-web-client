import { renewToken } from "../firebaseapi/authUtil";

class Session {
    private static instance: Session;
    private constructor() {}

    public static getInstance(): Session {
        if (!Session.instance) {
            Session.instance = new Session();
        }
        return Session.instance;
    }

    renewSession(): void {
        renewToken()    
    }
}

export default Session;