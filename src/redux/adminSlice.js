import { createSlice } from "@reduxjs/toolkit";

const initialState={
    admin:{}
}

export const adminSlice=createSlice({
    name:"admin",
    initialState,
    reducers:{
        login:(state,action)=>{
            
            console.log(action)
            state.name=action.payload.admin.name
            state.email=action.payload.admin.email
            state.password=action.payload.admin.password
            state.cpassword=action.payload.admin.cpassword
            state.role=action.payload.admin.role
            state.imgpath=action.payload.admin.imgpath
            state.id=action.payload.admin._id
            
            
        },
        logout: (state, action) => {
           
            state.name = "";
            state.email = "";
            state.cpassword="";
            state.role="";
            state. password="";

        },
    }
})

export const {login,logout} = adminSlice.actions
export default adminSlice.reducer