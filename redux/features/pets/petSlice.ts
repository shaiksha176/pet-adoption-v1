import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  pets: null,
  uploadedPets: null,
};
const petsSlice = createSlice({
  name: "pets",
  initialState,
  reducers: {
    setUserPets: (state, action) => {
      state.uploadedPets = action.payload;
    },
    setPets: (state, action) => {
      state.pets = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setUserPets, setPets } = petsSlice.actions;

export default petsSlice.reducer;
