import React, { useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Chip,
  CircularProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchNotifications } from '../store/slices/notificationSlice';
import { fetchRepositories } from '../store/slices/repositorySlice';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { notifications, loading } = useSelector(
    (state: RootState) => state.notifications
  );
  const { repositories } = useSelector((state: RootState) => state.repositories);

  useEffect(() => {
    dispatch(fetchNotifications() as any);
    dispatch(fetchRepositories() as any);
  }, [dispatch]);

  if (loading) {
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
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Repositories
              </Typography>
              <Typography variant="h3">{repositories.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Open Issues
              </Typography>
              <Typography variant="h3">
                {
                  notifications.filter(
                    (notification: any) => notification.state === 'open'
                  ).length
                }
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                New Notifications
              </Typography>
              <Typography variant="h3">
                {
                  notifications.filter(
                    (notification: any) => !notification.notified_at
                  ).length
                }
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Recent Issues
      </Typography>

      <Grid container spacing={2}>
        {notifications.slice(0, 5).map((notification: any) => (
          <Grid item xs={12} key={notification.id}>
            <Card>
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6">
                    {notification.repository_owner}/{notification.repository_name} #
                    {notification.issue_number}
                  </Typography>
                  <Chip
                    label={notification.state}
                    color={notification.state === 'open' ? 'success' : 'error'}
                    size="small"
                  />
                </Box>
                <Typography color="textSecondary" gutterBottom>
                  {notification.title}
                </Typography>
                <Typography variant="body2">
                  Created by: {notification.created_by}
                  {notification.assigned_to &&
                    ` | Assigned to: ${notification.assigned_to}`}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
