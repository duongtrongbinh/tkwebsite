export type responseSuccess<T = any> = {
  success: true;
  data: T;
  message: string;
};

export type responseUnauthenticated = {
  'message': string;
}

export type responseFail<T = any> = {
  success: false;
  data: T;
  message: string;
};

export type responseError = {
  success: false;
  message: string;
};
