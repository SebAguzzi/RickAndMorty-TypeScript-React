import { createAsyncThunk } from "@reduxjs/toolkit";
import * as auth from "firebase/auth";
import { authFirebase } from "../../config/firebase";
import axios from "axios";
import { useState } from "react";


export const registerUser = createAsyncThunk(
  "firebase/register",
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue }
  ) => {

    try {

        const response = await axios.post('http://localhost:3001/auth/register', {
          username: username, 
          password: password, 
        });

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
