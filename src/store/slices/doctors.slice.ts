import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Doctor } from '~/types/temp';
import { backUrl } from '~/constants/backUrl';

interface StateProps {
  doctorsLoading: boolean;
  createDoctorLoading: boolean;
  deleteDoctorLoading: boolean;
  doctors: Doctor[];
}

const initialState: StateProps = {
  doctorsLoading: false,
  createDoctorLoading: false,
  deleteDoctorLoading: false,
  doctors: [],
};

export const getDoctors = createAsyncThunk(
  'doctors/getDoctors',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${backUrl}clinic/doctors`);
      return response.data.doctors;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.body.error.message);
    }
  }
);

export const createDoctor = createAsyncThunk(
  'doctors/createDoctor',
  async (data: Doctor, thunkAPI) => {
    try {
      const response = await axios.post(`${backUrl}clinic/doctors`, data);
      console.log(response.data);

      return { ...data, ...response.data.doc };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.body.error.message);
    }
  }
);
export const deleteDoctor = createAsyncThunk(
  'doctors/deleteDoctor',
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.delete(`${backUrl}clinic/doctors/${id}`);
      console.log(response.data);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.body.error.message);
    }
  }
);

const doctorsSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDoctors.pending, (state) => {
        state.doctorsLoading = true;
      })
      .addCase(getDoctors.fulfilled, (state, action) => {
        state.doctorsLoading = false;
        state.doctors = action.payload;
      })
      .addCase(getDoctors.rejected, (_, action) => {
        toast.error(
          `code: ${action.error.code} \n message: ${action.error.message}`
        );
      })
      .addCase(createDoctor.pending, (state) => {
        state.createDoctorLoading = true;
      })
      .addCase(createDoctor.fulfilled, (state, action) => {
        state.createDoctorLoading = false;
        console.log('posle', action.payload);
        state.doctors?.push(action.payload);
      })
      .addCase(createDoctor.rejected, (_, action) => {
        toast.error(
          `code: ${action.error.code} \n message: ${action.error.message}`
        );
      })
      .addCase(deleteDoctor.pending, (state) => {
        state.deleteDoctorLoading = true;
      })
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.deleteDoctorLoading = false;
        state.doctors = state.doctors.filter(
          (doctor) => doctor._id !== action.payload
        );
      })
      .addCase(deleteDoctor.rejected, (_, action) => {
        toast.error(
          `code: ${action.error.code} \n message: ${action.error.message}`
        );
      });
  },
});

export const {} = doctorsSlice.actions;

export default doctorsSlice.reducer;
