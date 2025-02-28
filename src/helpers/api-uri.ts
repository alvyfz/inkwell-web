export enum PATH_API {
  LOGIN = '/users/login',
  SIGNUP = '/users/signup'
}

export enum METHOD {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  PATCH = 'PATCH'
}

export type TypeError = {
  response: {
    status: number | string
    data: {
      code: number | string
      message: string
    }
  }
  status: number | string
}
