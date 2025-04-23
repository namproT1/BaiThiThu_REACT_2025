import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'http://192.168.1.2:3000/XeMay';

export const fetchXe = createAsyncThunk('xe/fetchXe', async () => {
  const res = await fetch(BASE_URL);
  return res.json();
});

export const addXe = createAsyncThunk('xe/addXe', async (xeMoi) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(xeMoi),
  });
  return res.json();
});

export const deleteXe = createAsyncThunk('xe/deleteXe', async (id) => {
  await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  return id;
});

export const updateXe = createAsyncThunk('xe/updateXe', async (xeDaSua) => {
  const res = await fetch(`${BASE_URL}/${xeDaSua.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(xeDaSua),
  });
  return res.json();
});

const xeSlice = createSlice({
  name: 'xe',
  initialState: { list: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchXe.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addXe.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteXe.fulfilled, (state, action) => {
        state.list = state.list.filter(xe => xe.id !== action.payload);
      })
      .addCase(updateXe.fulfilled, (state, action) => {
        const index = state.list.findIndex(xe => xe.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      });
  }
});

export default xeSlice.reducer;
