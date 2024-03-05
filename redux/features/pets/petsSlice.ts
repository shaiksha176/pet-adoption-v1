import { Pet } from "@/types/pet";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PetState {
  pets: Pet[];
}

const initialState: PetState = {
  pets: [],
};

export const petSlice = createSlice({
  name: "pet",
  initialState,
  reducers: {},
});

export default petSlice.reducer;
