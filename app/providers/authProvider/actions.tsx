import { createAction } from "redux-actions";
import { IAuthStateContext, IAuthUser } from "./context";

export enum AuthActionEnums {
    signInPending = 'SIGN_IN_PENDING',
    signInSuccess = 'SIGN_IN_SUCCESS',
    signInError = 'SIGN_IN_ERROR',

    signUpPending = 'SIGN_UP_PENDING',
    signUpSuccess = 'SIGN_UP_SUCCESS',
    signUpError = 'SIGN_UP_ERROR',

    signOutPending = 'SIGN_OUT_PENDING',
    signOutSuccess = 'SIGN_OUT_SUCCESS',
    signOutError = 'SIGN_OUT_ERROR',
}

export const signInPending = createAction<IAuthStateContext>(
    AuthActionEnums.signInPending,
    () => ({ isAuthenticated: false, isPending: true, error: false })
);
export const signInSuccess = createAction<IAuthStateContext, { token: string, user: IAuthUser }>(
    AuthActionEnums.signInSuccess,
    ({ token, user }) => ({ isAuthenticated: true, isPending: false, error: false, token, user })
);
export const signInError = createAction<IAuthStateContext, { errorMessage: string }>(
    AuthActionEnums.signInError,
    ({ errorMessage }) => ({ isAuthenticated: false, isPending: false, error: true, errorMessage })
);

export const signUpPending = createAction<IAuthStateContext>(
    AuthActionEnums.signUpPending,
    () => ({ isAuthenticated: false, isPending: true, error: false })
);
export const signUpSuccess = createAction<IAuthStateContext, { user: IAuthUser }>(
    AuthActionEnums.signUpSuccess,
    ({ user }) => ({ isAuthenticated: true, isPending: false, error: false, user })
);
export const signUpError = createAction<IAuthStateContext, { errorMessage: string }>(
    AuthActionEnums.signUpError,
    ({ errorMessage }) => ({ isAuthenticated: false, isPending: false, error: true, errorMessage })
);

export const signOutPending = createAction<IAuthStateContext>(
    AuthActionEnums.signOutPending,
    () => ({ isAuthenticated: false, isPending: true, error: false })
);
export const signOutSuccess = createAction<IAuthStateContext>(
    AuthActionEnums.signOutSuccess,
    () => ({ isAuthenticated: false, isPending: false, error: false })
);
export const signOutError = createAction<IAuthStateContext,     { errorMessage: string }>(
    AuthActionEnums.signOutError,
    ({ errorMessage }) => ({ isAuthenticated: false, isPending: false, error: true, errorMessage })
);