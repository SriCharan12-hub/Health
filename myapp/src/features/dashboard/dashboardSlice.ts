import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Patient {
  id: string;
  name: string;
  condition: string;
  status: 'Critical' | 'Stable' | 'Recovering';
  lastAppointment: string;
}

export interface DashboardStats {
  patients: number;
  doctors: number;
  appointments: number;
  clinics: number;
}

export interface DashboardState {
  stats: DashboardStats;
  patients: Patient[];
  loading: boolean;
}

const initialState: DashboardState = {
  stats: {
    patients: 1234,
    doctors: 123,
    appointments: 456,
    clinics: 12,
  },
  patients: [
    { id: '1', name: 'John Doe', condition: 'Hypertension', status: 'Stable', lastAppointment: '2024-02-15' },
    { id: '2', name: 'Jane Smith', condition: 'Post-Surgery', status: 'Recovering', lastAppointment: '2024-02-14' },
    { id: '3', name: 'Mike Johnson', condition: 'Arrhythmia', status: 'Critical', lastAppointment: '2024-02-16' },
  ],
  loading: false,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = dashboardSlice.actions;
export default dashboardSlice.reducer;
