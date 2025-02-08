import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  fetchRepositories,
  addRepository,
  removeRepository,
} from '../store/slices/repositorySlice';

export default function Repositories() {
  const dispatch = useDispatch();
  const { repositories, loading } = useSelector(
    (state: RootState) => state.repositories
  );
  const [open, setOpen] = useState(false);
  const [newRepo, setNewRepo] = useState({ owner: '', name: '' });

  useEffect(() => {
    dispatch(fetchRepositories() as any);
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewRepo({ owner: '', name: '' });
  };

  const handleAdd = async () => {
    if (newRepo.owner && newRepo.name) {
      await dispatch(addRepository(newRepo) as any);
      handleClose();
    }
  };

  const handleRemove = async (id: number) => {
    if (window.confirm('Are you sure you want to remove this repository?')) {
      await dispatch(removeRepository(id) as any);
    }
  };

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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Repositories</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Add Repository
        </Button>
      </Box>

      <Grid container spacing={3}>
        {repositories.map((repo: any) => (
          <Grid item xs={12} md={6} key={repo.id}>
            <Card>
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6">
                    {repo.owner}/{repo.name}
                  </Typography>
                  <IconButton
                    color="error"
                    onClick={() => handleRemove(repo.id)}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
                <Typography color="textSecondary">
                  Last checked: {repo.last_checked || 'Never'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Repository</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Owner"
            fullWidth
            value={newRepo.owner}
            onChange={(e) => setNewRepo({ ...newRepo, owner: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Repository Name"
            fullWidth
            value={newRepo.name}
            onChange={(e) => setNewRepo({ ...newRepo, name: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
