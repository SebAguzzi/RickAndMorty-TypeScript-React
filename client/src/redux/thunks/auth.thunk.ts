import { createAsyncThunk } from "@reduxjs/toolkit";
import * as auth from "firebase/auth";
import { authFirebase } from "../../config/firebase";

export const registerUser = createAsyncThunk(
  "firebase/register",
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const authGenerate = await auth.createUserWithEmailAndPassword(
        authFirebase,
        username, 
        password  
        );
        
      const { email, uid } = authGenerate.user;
      const { token: accessToken, expirationTime } =
        await authGenerate.user.getIdTokenResult();
      return {
        accessToken,
        expirationTime,
        userData: {
          email,
          uid,
        },
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const authThunk = createAsyncThunk(
  "firebase/auth",
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const authGenerate = await auth.signInWithEmailAndPassword(
        authFirebase,
        username,
        password
      );

      const { email, uid } = authGenerate.user;
      const { token: accessToken, expirationTime } =
        await authGenerate.user.getIdTokenResult();
      return {
        accessToken,
        expirationTime,
        userData: {
          email,
          uid,
        },
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
