import { createSlice } from "@reduxjs/toolkit";


export const filterSlice = createSlice({
    name: 'filter',
    initialState: {

    },
    reducers: {

    }
})

//Actions to choose from
export const {test} = filterSlice.actions;

//Getters

export default filterSlice.reducer