export const isValidEmail = (email: string): boolean => /^\S+@\S+$/.test(email)

export const isValidUsername = (username: string): boolean => /^[0-9A-Za-z]{6,16}$/.test(username)

export const isValidPassword = (password: string): boolean =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)

export const decodeJwt = (token: string): any => JSON.parse(atob(token.split('.')[1]))

export const capitalizeWords = (string: string) =>
  string
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
