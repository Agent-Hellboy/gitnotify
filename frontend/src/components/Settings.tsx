import React, { useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  fetchPreferences,
  updatePreferences,
} from '../store/slices/notificationSlice';

export default function Settings() {
  const dispatch = useDispatch();
  const { preferences, loading } = useSelector(
    (state: RootState) => state.notifications
  );

  useEffect(() => {
    dispatch(fetchPreferences() as any);
  }, [dispatch]);

  const handleFrequencyChange = (event: any) => {
    if (preferences) {
      dispatch(
        updatePreferences({
          ...preferences,
          frequency: event.target.value,
        }) as any
      );
    }
  };

  const handleEmailToggle = (event: any) => {
    if (preferences) {
      dispatch(
        updatePreferences({
          ...preferences,
          email_notifications: event.target.checked,
        }) as any
      );
    }
  };

  if (loading || !preferences) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Notification Preferences
          </Typography>

          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Notification Frequency</InputLabel>
              <Select
                value={preferences.frequency}
                label="Notification Frequency"
                onChange={handleFrequencyChange}
              >
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="realtime">Real-time</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box>
            <FormControlLabel
              control={
                <Switch
                  checked={preferences.email_notifications}
                  onChange={handleEmailToggle}
                />
              }
              label="Email Notifications"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
