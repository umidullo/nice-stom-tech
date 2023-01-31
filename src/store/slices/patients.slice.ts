import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backUrl } from '~/constants/backUrl';
import { Patient } from '~/types/temp';

interface StateProps {
  patientsLoading: boolean;
  createPatientLoading: boolean;
  deletePatientLoading: boolean;
  updatePatientLoading: boolean;
  patients: Patient[];
}

const initialState: StateProps = {
  patientsLoading: false,
  createPatientLoading: false,
  deletePatientLoading: false,
  updatePatientLoading: false,
  patients: [],
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

      return { ...data, ...response.data };
    } catch (error: any) {
      console.log(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updatePatient = createAsyncThunk(
  'patients/updatePatient',
  async (data: Patient, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${backUrl}clinic/patients/${data._id}`,
        {
          fullName: data.fullName,
          dob: data.dob,
          phoneNumber: data.phoneNumber,
        }
      );
      console.log('patients/updatePatient', response);

      return { ...data, ...response.data };
    } catch (error: any) {
      console.log(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const deletePatient = createAsyncThunk(
  'patients/deletePatient',
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.delete(`${backUrl}clinic/patients/${id}`);
      console.log(response.data);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.body.error.message);
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
      })
      .addCase(createPatient.pending, (state) => {
        state.createPatientLoading = true;
      })
      .addCase(createPatient.fulfilled, (state, action) => {
        state.createPatientLoading = false;
        console.log('posle', action.payload);
        state.patients?.push(action.payload);
      })
      .addCase(createPatient.rejected, (_, action) => {
        toast.error(
          `code: ${action.error.code} \n message: ${action.error.message}`
        );
      })
      .addCase(deletePatient.pending, (state) => {
        state.deletePatientLoading = true;
      })
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.deletePatientLoading = false;
        state.patients = state.patients.filter(
          (patient) => patient._id !== action.payload
        );
      })
      .addCase(deletePatient.rejected, (_, action) => {
        toast.error(
          `code: ${action.error.code} \n message: ${action.error.message}`
        );
      })
      .addCase(updatePatient.pending, (state) => {
        state.updatePatientLoading = true;
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        state.updatePatientLoading = false;
        const updatedPatient = state.patients.filter(
          (patient) => patient._id !== action.payload._id
        )[0];
        state.patients.push(updatedPatient);
      })
      .addCase(updatePatient.rejected, (_, action) => {
        toast.error(
          `code: ${action.error.code} \n message: ${action.error.message}`
        );
      });
  },
});

export const {} = patientsSlice.actions;

export default patientsSlice.reducer;
