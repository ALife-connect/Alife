import { createSlice } from "@reduxjs/toolkit";

const AppReducer = createSlice({
    name: "App",
    initialState: {
        isLoggedIn: false,
        loggedInUser:{},
        paymentStatus: false,
        role:"",
        token:""
    },
    reducers:{
        logIn:(state, {payload})=>{
            state.isLoggedIn = true;
            state.loggedInUser = payload
            state.role = payload?.data?.role
        },
        profilePic:(state, {payload})=>{
            state.loggedInUser.profilePics = payload
        },
        saveToken:(state,{payload})=>{
            state.token = payload
        },
        paymentStatus:(state)=>{
            state.paymentStatus = true
        },
        logOut:(state)=>{
            state.isLoggedIn = false;
            state.loggedInUser = {};
            state.token = ""
        },
    }
})
export const {logIn, logOut, saveToken, profilePic, paymentStatus} = AppReducer.actions;
export default AppReducer.reducer;