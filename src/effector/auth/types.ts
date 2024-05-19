export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface AuthStore {
  isAuth: boolean;
  user?: User;
}
