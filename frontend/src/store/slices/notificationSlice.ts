import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface NotificationState {
  notifications: any[];
  preferences: any;
  loading: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  notifications: [],
  preferences: null,
  loading: false,
  error: null,
};

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState }: any) => {
    const { token } = getState().auth;
    const response = await axios.get('/api/issue-notifications/', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export const fetchPreferences = createAsyncThunk(
  'notifications/fetchPreferences',
  async (_, { getState }: any) => {
    const { token } = getState().auth;
    const response = await axios.get('/api/notification-preferences/', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data[0];
  }
);

export const updatePreferences = createAsyncThunk(
  'notifications/updatePreferences',
  async (preferences: any, { getState }: any) => {
    const { token } = getState().auth;
    const response = await axios.put(
      `/api/notification-preferences/${preferences.id}/`,
      preferences,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }
);

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch notifications';
      })
      .addCase(fetchPreferences.fulfilled, (state, action) => {
        state.preferences = action.payload;
      })
      .addCase(updatePreferences.fulfilled, (state, action) => {
        state.preferences = action.payload;
      });
  },
});

export default notificationSlice.reducer;
