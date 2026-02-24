import { handleActions } from "redux-actions";
import { AuthActionEnums } from "./actions";
import { INITIAL_STATE, IAuthStateContext } from "./context";

export const authReducer = handleActions<IAuthStateContext, IAuthStateContext>(
    {
        [AuthActionEnums.signInPending]: (state, { payload }: { payload: IAuthStateContext }) => ({
            ...state,
            ...payload,
        }),
        [AuthActionEnums.signInSuccess]: (state, { payload }: { payload: IAuthStateContext }) => ({
            ...state,
            ...payload,
        }),
        [AuthActionEnums.signInError]: (state, { payload }: { payload: IAuthStateContext }) => ({
            ...state,
            ...payload,
        }),
        [AuthActionEnums.signUpPending]: (state, { payload }: { payload: IAuthStateContext }) => ({
            ...state,
            ...payload,
        }),
        [AuthActionEnums.signUpSuccess]: (state, { payload }: { payload: IAuthStateContext }) => ({
            ...state,
            ...payload,
        }),
        [AuthActionEnums.signUpError]: (state, { payload }: { payload: IAuthStateContext }) => ({
            ...state,
            ...payload,
        }),
        [AuthActionEnums.signOutPending]: (state, { payload }: { payload: IAuthStateContext }) => ({
            ...state,
            ...payload,
        }),
        [AuthActionEnums.signOutSuccess]: (state, { payload }: { payload: IAuthStateContext }) => ({
            ...state,
            ...payload,
        }),
        [AuthActionEnums.signOutError]: (state, { payload }: { payload: IAuthStateContext }) => ({
            ...state,
            ...payload,
        }),
    },
    INITIAL_STATE
);