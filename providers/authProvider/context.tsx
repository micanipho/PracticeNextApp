import { createContext } from "react";

export const userRoles = ['user', 'admin'] as const;
export type UserRole = (typeof userRoles)[number];


export interface IAuthUser {
    id: string,
    name?: string,
    email?: string,
    password?: string,
    salt?: string,
    role: UserRole,
    token?: string,
    createdAt?: Date,
    updatedAt?: Date,
}

export interface IAuthSignIn {
    email: string,
    password: string,
}

export interface IAuthSignUp {
    name: string,
    email: string,
    password: string,
    role: UserRole,
    confirmPassword: string,
}

export interface IAuthStateContext {
    user?: IAuthUser;
    isAuthenticated: boolean;
    isPending: boolean;
    error: boolean;
    token?: string;
    errorMessage?: string;
}

export interface IAuthContext {
    signIn: (data: IAuthSignIn) => void;
    signUp: (data: IAuthSignUp) => void;
    signOut: () => void;
}

export const INITIAL_STATE: IAuthStateContext = {
    isAuthenticated: false,
    isPending: false,
    error: false,
    token: undefined,
}

export const AuthStateContext = createContext<IAuthStateContext>(INITIAL_STATE);

export const AuthActionContext = createContext<IAuthContext | null>(null);
