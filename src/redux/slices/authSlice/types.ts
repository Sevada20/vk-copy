export interface UserData {
  isRegForm: boolean;
  authData: {
    email: string;
    password: string;
    name: string;
  };
}
export interface IUser {
  avatar: string;
  id: string;
  name: string | null;
}

export interface AuthState {
  user: IUser | null;
  status: string;
  error: string | null;
}
