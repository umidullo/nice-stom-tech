import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backUrl } from '~/constants/backUrl';
import { Patient } from '~/types/temp';

interface StateProps {
  patientsLoading: boolean;
  createPatientLoading: boolean;
  deletePatientLoading: boolean;
  patients: Patient[] | null;
}

const initialState: StateProps = {
  patientsLoading: false,
  createPatientLoading: false,
  deletePatientLoading: false,
  patients: null,
};

export const getPatients = createAsyncThunk(
  'patients/getPatients',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${backUrl}clinic/patients`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.body.error.message);
    }
  }
);

export const createPatient = createAsyncThunk(
  'patients/createPatient',
  async (data: Patient, thunkAPI) => {
    try {
      const response = await axios.post(`${backUrl}clinic/patients`, data);
      console.log('patients/createPatient', response);

      return response;
    } catch (error: any) {
      console.log(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPatients.pending, (state) => {
        state.patientsLoading = true;
      })
      .addCase(getPatients.fulfilled, (state, action) => {
        state.patientsLoading = false;
        state.patients = action.payload.patients;
      })
      .addCase(getPatients.rejected, (_, action) => {
        console.log(action);

        toast.error(
          `code: ${action.error.code} \n message: ${action.error.message}`
        );
      });
  },
});

export const {} = patientsSlice.actions;

export default patientsSlice.reducer;
