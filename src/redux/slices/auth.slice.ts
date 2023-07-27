import { createSlice } from "@reduxjs/toolkit";
import { authThunk } from "../thunks/auth.thunk";
import { RejectedActionFromAsyncThunk } from "@reduxjs/toolkit/dist/matchers";

interface AuthState {
    isAuth: boolean;
    success: boolean;
    error: RejectedActionFromAsyncThunk<any> | null;
    loading: boolean;
    userData: {
        email: string | null;
        uid: string | null;
    } | null;
    accessToken: string | null;
    isExpired: boolean | null;
}

const initialState: AuthState = {
    isAuth: false,
    accessToken: null,
    error: null,
    isExpired: null,
    loading: false,
    success: false,
    userData: null
}

export const authSlice = createSlice ({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            state.isAuth = true;
        },
        logout: (state) => {
            state.isAuth = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(authThunk.pending, (state) => {
            return (state = {
                ...initialState,
                loading: true,
            })
        });
        builder.addCase(authThunk.fulfilled, (state, action) => {
            return (state = {
                ...initialState,
                loading: false,
                success: true,
                accessToken: action.payload.accessToken,
                isAuth: true,
                isExpired: false,
                userData: action.payload.userData,
            })
        });
        builder.addCase(authThunk.rejected, (state, action) => {
            return (state = {
                ...initialState,
                error: action.payload,
            })
        });
    }
})

export const { login, logout } = authSlice.actions;
