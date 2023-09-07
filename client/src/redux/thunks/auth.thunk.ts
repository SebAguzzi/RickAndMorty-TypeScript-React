import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


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

        console.log('response', response.data);
        return response.data;

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
      const response = await axios.post('http://localhost:3001/auth/login', {
        username: username, 
        password: password, 
      });
      
      console.log('data', response.data)
      return response.data;

      // const authGenerate = await auth.signInWithEmailAndPassword(
      //   authFirebase,
      //   username,
      //   password
      // );

      // const { email, uid } = authGenerate.user;
      // const { token: accessToken, expirationTime } =
      //   await authGenerate.user.getIdTokenResult();
      // return {
      //   accessToken,
      //   expirationTime,
      //   userData: {
      //     email,
      //     uid,
      //   },
      // };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
