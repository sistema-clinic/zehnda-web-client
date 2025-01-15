class Logger {
    private static instance: Logger;
    private isEnabled: boolean = import.meta.env.VITE_LOG_ENABLED === 'true';
    private constructor() {}

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    log(message?: any, options?: any): void {
        if(this.isEnabled)
            console.log(message, options);
    }

    error(message?: any, options?: any): void {
        console.error(message, options);
    }
}

export default Logger;