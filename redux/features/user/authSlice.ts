import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const getInitialUserInfo = async () => {
  try {
    const userInfoString: any = await AsyncStorage.getItem("user");
    return userInfoString ? JSON.parse(userInfoString) : null;
  } catch (error) {
    // Handle error, e.g., log it or set a default value
    console.error("Error while retrieving user info from AsyncStorage:", error);
    return null;
  }
};

export const checkAuthStatus = createAsyncThunk("auth/status", async () => {
  try {
    const userInfoString: any = await AsyncStorage.getItem("user");
    return userInfoString ? JSON.parse(userInfoString) : null;
  } catch (error) {
    // Handle error, e.g., log it or set a default value
    console.error("Error while retrieving user info from AsyncStorage:", error);
    throw error;
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const removedItem = await AsyncStorage.clear(); // Remove auth token (adjust key if needed)
    return null; // Return no payload (optional)
  } catch (error) {
    console.error("Logout error:", error);
    throw error; // Re-throw for error handling (optional)
  }
});

const initialState = {
  // user: getInitialUserInfo() || null,
  user: null,
  isLoading: false,
};
const authSlice: any = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      AsyncStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(checkAuthStatus.fulfilled, (state, { payload }) => {
        if (!payload) return;
        state.user = payload;
      })
      .addCase(checkAuthStatus.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
