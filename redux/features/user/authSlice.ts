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
  // user: getInitialUserInfo(),
  user: null,
  isLoading: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      console.log(action.payload);
      //   state.userInfo = action.payload;
      // state.isAuthenticated = true;
      state.user = action.payload;
      AsyncStorage.setItem("user", JSON.stringify(action.payload));

      //   const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days
      //   AsyncStorage.setItem("expirationTime", expirationTime);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        console.log("logged out successfully");
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
