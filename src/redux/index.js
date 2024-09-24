import { configureStore,combineReducers } from '@reduxjs/toolkit'
import userReducer from  "./adminSlice"
// import customerReducer  from "./customerSlice"
// import loanReducer  from "./loanSlice"
// import emiReducer  from "./emiSlice"
import {persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"
import persistStore from 'redux-persist/es/persistStore'

const rootReducer=combineReducers({
  admin:userReducer,
//   customer:customerReducer,
//   loan:loanReducer,
//   emi:emiReducer,
})

const persistConfig={
  key:"root",
  storage,version:1
};

const persistedReducer=persistReducer(persistConfig,rootReducer)

export const store= configureStore({
  
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>
      getDefaultMiddleware({serializableCheck:false}),
   
  })

  export const persistor=persistStore(store)


  