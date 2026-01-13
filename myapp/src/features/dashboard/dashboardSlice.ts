import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DashboardStats {
  patients: number;
  doctors: number;
  appointments: number;
  clinics: number;
}

export interface DashboardState {
  stats: DashboardStats;
}

const initialState: DashboardState = {
  stats: {
    patients: 1234,
    doctors: 123,
    appointments: 456,
    clinics: 12,
  },
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    // Demo action to update a stat
    updateStat: (state, action: PayloadAction<{ key: keyof DashboardStats; value: number }>) => {
      state.stats[action.payload.key] = action.payload.value;
    },
  },
});

export const { updateStat } = dashboardSlice.actions;
export default dashboardSlice.reducer;
