import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks for video actions
export const fetchVideos = createAsyncThunk('videos/fetchVideos', async () => {
    const { data } = await axios.get('/api/v1/videos');
    return data;
});

export const fetchVideoById = createAsyncThunk('videos/fetchVideoById', async (id) => {
    const { data } = await axios.get(`/api/v1/videos/${id}`);
    return data;
});

export const fetchVideoByDevice = createAsyncThunk('videos/fetchVideoByDevice', async (device) => {
    const { data } = await axios.get(`/api/v1/videos/device/${device}`);
    return data;
});

export const insertVideoFile = createAsyncThunk('videos/insertVideoFile', async (formData) => {
    const { data } = await axios.post('/api/v1/admin/insert', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
});

export const updateVideoFile = createAsyncThunk('videos/updateVideoFile', async ({ id, formData }) => {
    const { data } = await axios.put(`/api/v1/admin/update/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
});

export const deleteVideo = createAsyncThunk('videos/deleteVideo', async (id) => {
    const { data } = await axios.delete(`/api/v1/admin/delete/${id}`);
    return data;
});

// Video slice
const videoSlice = createSlice({
    name: 'videos',
    initialState: {
        videos: [],
        videoDetails: null,
        loading: false,
        error: null,
        success: false,
        isUpdated: false,
        isDeleted : false
    },
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVideos.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchVideos.fulfilled, (state, action) => {
                state.loading = false;
                state.videos = action.payload;
            })
            .addCase(fetchVideos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchVideoById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchVideoById.fulfilled, (state, action) => {
                state.loading = false;
                state.videoDetails = action.payload;
            })
            .addCase(fetchVideoById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchVideoByDevice.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchVideoByDevice.fulfilled, (state, action) => {
                state.loading = false;
                state.videoDetails = action.payload.data;
            })
            .addCase(fetchVideoByDevice.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(insertVideoFile.pending, (state) => {
                state.loading = true;
            })
            .addCase(insertVideoFile.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.videos.push(action.payload);
            })
            .addCase(insertVideoFile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateVideoFile.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateVideoFile.fulfilled, (state, action) => {
                state.loading = false;
                state.isUpdated = true;
                const index = state.videos.findIndex(video => video._id === action.payload._id);
                state.videos[index] = action.payload;
            })
            .addCase(updateVideoFile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteVideo.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteVideo.fulfilled, (state, action) => {
                state.loading = false;
                state.isDeleted = true;
                state.videos = state.videos.filter(video => video._id !== action.payload._id);
            })
            .addCase(deleteVideo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { clearErrors } = videoSlice.actions;
export default videoSlice.reducer;
