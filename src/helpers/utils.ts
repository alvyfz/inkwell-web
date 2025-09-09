import nextConfig from '../../next.config'

export const isValidEmail = (email: string): boolean => /^\S+@\S+$/.test(email)

export const isValidUsername = (username: string): boolean => /^[0-9A-Za-z]{6,16}$/.test(username)

export const isValidPassword = (password: string): boolean =>
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password)

export const decodeJwt = (token: string): any => JSON.parse(atob(token.split('.')[1]))

export const capitalizeWords = (string: string) =>
  string
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

export const isDevEnv = nextConfig?.env?.ENV === 'DEV'

export function jwtExpToCookieExp(exp: number): Date {
  return new Date(exp * 1000)
}
