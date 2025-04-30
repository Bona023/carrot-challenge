export const USERNAME_MIN_LENGTH = 5;
export const PASSWORD_MIN_LENGTH = 10;
export const PASSWORD_REGEX = new RegExp(/^(?=.*[a-z])(?=.*\d)(?=.*?[!@#$%^&*]).+$/);
export const PASSWORD_REGEX_ERROR = "The password must contain al least one lowercase, number and special characters(!@#$%^&*).";
export const PASSWORD_HASHED_NUM = 12;
