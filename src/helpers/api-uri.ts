export enum PATH_API {
  LOGIN = '/users/login',
  SIGNUP = '/users/signup',
  SEND_OTP = '/users/send-otp',
  VERIFY_EMAIL = '/users/verify-email',
  ME = '/users/me',
  FILE = '/files',
  ARTICLE_DRAFT = '/articles/draft',
  ARTICLE_PUBLISH = '/articles/publish',
  ARTICLE_MY_LIST = '/articles/my-list',
  ALL_TOPIC = '/topics/all',
  TOPIC = '/topics'
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
