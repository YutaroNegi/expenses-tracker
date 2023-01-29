import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import type { AuthState } from '../types'


const initialState: AuthState = {
    loginForm: {
        email: '',
        password: ''
    },
    user: {
        id: '',
        username: '',
        email: '',
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<AuthState>) => {
            state.user = action.payload.user;
        }

    }
})

export const { setUser } = authSlice.actions
export const selectAuth = (state: RootState) => state.auth
export default authSlice.reducer