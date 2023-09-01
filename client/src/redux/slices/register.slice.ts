import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "../thunks/auth.thunk"; // Necesitas definir esta acción asincrónica para el registro

interface RegisterState {
  isRegistered: boolean;
  error: string | null;
  loading: boolean;
}

const initialState: RegisterState = {
  isRegistered: false,
  error: null,
  loading: false,
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    registered: (state) => {
      state.isRegistered = true;
    },
    resetRegistration: (state) => {
      state.isRegistered = false;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.isRegistered = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { registered, resetRegistration } = registerSlice.actions;
