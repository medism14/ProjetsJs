import { configureStore } from "@reduxjs/toolkit";

import userReducer from './features/userSlice';
import htmlElementsReducer from './features/htmlElementsSlice';

export const store = configureStore({
    reducer:{
        user: userReducer,
        htmlElements: htmlElementsReducer
    }
});