import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// פעולה אסינכרונית לטעינת הקטגוריות
export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async () => {
        const response = await axios.get('http://localhost:8080/CollectionCategories/getAllCategories', {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    }
);

const ListCategoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        list: [],
        status: 'idle', // idle | loading | succeeded | failed
        error: null,
    },
    reducers: {}
    ,
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default ListCategoriesSlice.reducer;