import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token') || null,  // ✅ Load from localStorage on init
        user: JSON.parse(localStorage.getItem('user')) || null,  // ✅ Load user too
        loading: false  // Changed to false since we're loading from localStorage
    },
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token
            state.user = action.payload.user
            // ✅ Save to localStorage
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('user', JSON.stringify(action.payload.user))
        },
        logout: (state) => {
            state.token = null  // ✅ Fixed: was "" (empty string), should be null
            state.user = null
            // ✅ Remove from localStorage
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const { login, logout, setLoading } = authSlice.actions

export default authSlice.reducer;