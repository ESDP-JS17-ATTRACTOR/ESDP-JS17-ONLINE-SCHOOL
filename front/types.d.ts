export interface RegisterMutation {
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  phoneNumber: string;
  password: string;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _name: string;
}

export interface GlobalError {
  error: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  token: string;
  email: string;
  phoneNumber: string;
  country: string;
  googleId?: string;
}