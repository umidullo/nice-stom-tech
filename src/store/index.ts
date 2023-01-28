import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import confirmReducer from './slices/confirm.slice';
import doctorsReducer from './slices/doctors.slice';
import patientsReducer from './slices/patients.slice';

export const store = configureStore({
  reducer: {
    confirm: confirmReducer,
    doctors: doctorsReducer,
    patients: patientsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
