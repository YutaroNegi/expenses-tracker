import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import type { AuthState, User } from '../types'


const initialState: AuthState = {
    loginForm: {
        email: '',
        password: ''
    },
    user: {
        userId: '',
        firstName: '',
        lastName: '',
        email: '',
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            console.log('setUser action.payload: ', action.payload);
            
            state.user = action.payload;
        }

    }
})

export const { setUser } = authSlice.actions
export const selectAuth = (state: RootState) => state.auth
export default authSlice.reducer