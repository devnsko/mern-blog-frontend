import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const { data } = await axios.get('/posts');
    return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const { data } = await axios.get('/tags');
    return data;
});

const initialState = {
    posts: {
        items: [],
        status: 'loading',
    },
    tags: {
        items: [],
        status: 'loading',
    }
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchPosts.pending, (state) => {
            state.posts.status = 'loading';
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.posts.status = 'success';
            state.posts.items = action.payload;
        })
        .addCase(fetchPosts.rejected, (state) => {
            state.posts.items = [];
            state.posts.status = 'failed';
        })
        .addCase(fetchTags.pending, (state) => {
            state.tags.status = 'loading';
        })
        .addCase(fetchTags.fulfilled, (state, action) => {
            state.tags.status = 'success';
            state.tags.items = action.payload;
        })
        .addCase(fetchTags.rejected, (state) => {
            state.tags.items = [];
            state.tags.status = 'failed';
        });
    }
});

export const postsReducer = postsSlice.reducer;