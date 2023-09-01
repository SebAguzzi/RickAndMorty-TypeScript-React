import { configureStore } from '@reduxjs/toolkit';
import { cartSlice, authSlice, registerSlice  } from './slices';

export const store = configureStore({
    reducer: {
        cartReducer: cartSlice.reducer,
        authReducer: authSlice.reducer,
        registerReducer: registerSlice.reducer,       
    },    
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;