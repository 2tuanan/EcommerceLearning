import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const admin_login = createAsyncThunk(
    'auth/admin_login',
    async(infor) => {
        // console.log(info);
        try {
            const {data} = await api.post('/admin-login', infor, {withCredentials: true})
            console.log(data);
        } catch (error) {
            
        }
    }
)

export const authReducer = createSlice({
    name : 'auth',
    initialState : {
        successMessage : '',
        errorMessage : '',
        loader : false, 
        userInfo : ''
    },
    reducer : {

    },
    extraReducers : () => {

    }
})

export default authReducer.reducer;