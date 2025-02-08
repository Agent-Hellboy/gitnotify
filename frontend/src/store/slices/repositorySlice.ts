import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface RepositoryState {
  repositories: any[];
  loading: boolean;
  error: string | null;
}

const initialState: RepositoryState = {
  repositories: [],
  loading: false,
  error: null,
};

export const fetchRepositories = createAsyncThunk(
  'repositories/fetchRepositories',
  async (_, { getState }: any) => {
    const { token } = getState().auth;
    const response = await axios.get('/api/repositories/', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export const addRepository = createAsyncThunk(
  'repositories/addRepository',
  async (repository: { name: string; owner: string }, { getState }: any) => {
    const { token } = getState().auth;
    const response = await axios.post('/api/repositories/', repository, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export const removeRepository = createAsyncThunk(
  'repositories/removeRepository',
  async (id: number, { getState }: any) => {
    const { token } = getState().auth;
    await axios.delete(`/api/repositories/${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  }
);

const repositorySlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepositories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRepositories.fulfilled, (state, action) => {
        state.loading = false;
        state.repositories = action.payload;
      })
      .addCase(fetchRepositories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch repositories';
      })
      .addCase(addRepository.fulfilled, (state, action) => {
        state.repositories.push(action.payload);
      })
      .addCase(removeRepository.fulfilled, (state, action) => {
        state.repositories = state.repositories.filter(
          (repo) => repo.id !== action.payload
        );
      });
  },
});

export default repositorySlice.reducer;
