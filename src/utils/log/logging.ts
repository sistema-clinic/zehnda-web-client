/**********************************************************
 * Componente: Logger
 * Desarrolador: Carlos Morante
 * Feha: 20 Diciembre 2024
***********************************************************/
/**
 * Clase utilitaria para manejar los logs de la aplicación
 */
class Logger {
    private static instance: Logger;
    private isEnabled: boolean = import.meta.env.VITE_LOG_ENABLED === 'true';
    private constructor() {}

    /**
     * Obtiene la instancia del logger
     * @returns 
     */
    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    /**
     * Imprime un mensaje en la consola
     * @param message 
     * @param options 
     */
    log(message?: any, options?: any): void {
        if(this.isEnabled)
            console.log(message, options);
    }

    /**
     * Imprime un mensaje de advertencia en la consola
     * @param message 
     * @param options 
     */
    error(message?: any, options?: any): void {
        console.error(message, options);
    }
}

export default Logger;