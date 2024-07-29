import { configureStore } from '@reduxjs/toolkit';
import dataSlice from './Slice/dataSlice';
import { userProfileService } from './Service/CardService';

export const store = configureStore({
    reducer: {
        card: dataSlice,
        //  reducers 
        [userProfileService.reducerPath]: userProfileService.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userProfileService.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;