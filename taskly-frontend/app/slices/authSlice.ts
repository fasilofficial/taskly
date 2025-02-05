import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Helper function to safely access localStorage
const getStorageItem = (key: string) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
  return null;
};

const initialState = {
  user: null,
  token: null,
};

// Initialize state with localStorage values if we're on the client
if (typeof window !== "undefined") {
  const storedUser = getStorageItem("user");
  const storedToken = getStorageItem("token");

  if (storedUser) {
    initialState.user = JSON.parse(storedUser);
  }
  if (storedToken) {
    initialState.token = storedToken;
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
