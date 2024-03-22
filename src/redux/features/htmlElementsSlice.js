import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bodyAuthWidth: 0,
    bodyAuthHeight: 0,
    loading: true,
    panierChange: 0,
    actualPageProduit: parseInt(localStorage.getItem('actualPageProduit')) || 1,
    actualPageCategorie: parseInt(localStorage.getItem('actualPageCategorie')) || 1,
}

const htmlElementsSlice = createSlice({
    name: 'htmlElementsSlice',
    initialState,
    reducers: {
        setBodyWidth: (state, action) => {
            state.bodyAuthWidth = action.payload
        },
        setBodyHeight: (state, action) => {
            state.bodyAuthHeight = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setPanierChange: (state) => {
            state.panierChange += 1 ;
        },
        setActualPageProduit: (state, action) => {
            state.actualPageProduit = action.payload;
            localStorage.setItem('actualPageProduit', action.payload);
        },
        setActualPageCategorie: (state, action) => {
            state.actualPageCategorie = action.payload;
            localStorage.setItem('actualPageCategorie', action.payload);
        }
    }
});

export const { setBodyWidth, setBodyHeight, setLoading, setPanierChange, setActualPageProduit, setActualPageCategorie } = htmlElementsSlice.actions;

export default htmlElementsSlice.reducer;