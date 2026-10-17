/**********************************************************
 * Descripcion: Enums generales de la app
 * Desarrolador: Carlos Morante
 * Feha: 22 Diciembre 2024
***********************************************************/
export enum AuthMode {
    PasswordResetSuccess = 1,
    PasswordResetFailed = 2,
    PasswordResetCodeVerified = 3,
    PasswordResetCodeNotVerified = 4,
    PasswordResetCodeExpired = 5,
    PasswordResetCodeUsed = 6,
    PasswordResetCodeInvalid = 7,
}