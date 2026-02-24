'use client';
import { useReducer, useMemo, useContext, useEffect } from "react";
import { INITIAL_STATE, AuthActionContext, AuthStateContext, IAuthSignIn, IAuthSignUp } from "./context";
import { authReducer } from "./reducer";
import { 
    signInError,
    signInPending,
    signInSuccess,
    signUpError,
    signUpPending,
    signUpSuccess,
    signOutError,
    signOutPending,
    signOutSuccess 
} from "./actions";
import { signInAction, signUpAction, signOutAction, getAuthAction } from "@/lib/authActions";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

    // Initial session check
    useEffect(() => {
        const checkSession = async () => {
            dispatch(signInPending());
            const user = await getAuthAction();
            if (user) {
                dispatch(signInSuccess({ user, token: user.token || '' }));
            } else {
                dispatch(signOutSuccess());
            }
        };
        checkSession();
    }, []);

    const actions = useMemo(() => {
        const signIn = async (payload: IAuthSignIn) => {
            dispatch(signInPending());
            const result = await signInAction(payload);
            
            if (result.error) {
                dispatch(signInError({ errorMessage: result.errorMessage || "Sign in failed" }));
            } else if (result.user) {
                dispatch(signInSuccess({ user: result.user, token: result.token}));
            }
        }

        const signUp = async (payload: IAuthSignUp) => {
            dispatch(signUpPending());
            const result = await signUpAction(payload);
            
            if (result.error) {
                dispatch(signUpError({ errorMessage: result.errorMessage || "Sign up failed" }));
            } else if (result.user) {
                dispatch(signUpSuccess({ user: result.user }));
            }
        }

        const signOut = async () => {
            dispatch(signOutPending());
            const result = await signOutAction();
            
            if (result.error) {
                dispatch(signOutError({ errorMessage: result.errorMessage || "Sign out failed" }));
            } else {
                dispatch(signOutSuccess());
            }
        }

        return { signIn, signUp, signOut };
    }, []);

    return (
        <AuthStateContext.Provider value={state}>
            <AuthActionContext.Provider value={actions}>
                {children}
            </AuthActionContext.Provider>
        </AuthStateContext.Provider>
    );
};

export const useAuth = () => useContext(AuthStateContext);
export const useAuthActions = () => useContext(AuthActionContext);