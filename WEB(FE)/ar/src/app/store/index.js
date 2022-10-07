import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import UserReducer from './UserSlice';
import AuthReducer from '../slice/AuthSlice';
import persistStore from 'redux-persist/es/persistStore';

const persistConfig = {
  key: "root", // save to localStorage
  storage
}

const rootReducer = combineReducers({
  user: UserReducer,
  auth: AuthReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
})

export const persistor = persistStore(store);
export default store;
