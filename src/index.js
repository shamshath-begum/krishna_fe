import React from 'react';
import {store,persistor} from "./redux/index"
import {Provider} from "react-redux"
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PersistGate persistor={persistor}>

    <Provider store={store}>
    <App />
    <ToastContainer autoClose={3000} />
    </Provider>
    </PersistGate>
  </React.StrictMode>
);