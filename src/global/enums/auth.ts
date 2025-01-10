export enum AuthMode {
    PasswordResetSuccess = 1,
    PasswordResetFailed = 2,
    PasswordResetCodeVerified = 3,
    PasswordResetCodeNotVerified = 4,
    PasswordResetCodeExpired = 5,
    PasswordResetCodeUsed = 6,
    PasswordResetCodeInvalid = 7,
}