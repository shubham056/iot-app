import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./Message";
import AuthService from "../../services/auth.service";
const user = JSON.parse(localStorage.getItem("user"));

//signup user
export const register = createAsyncThunk(
  "auth/register",
  async ({ firstName, lastName, email, password, confirmPwd }, thunkAPI) => {
    try {
      const response = await AuthService.register(firstName, lastName, email, password, confirmPwd);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

//login user
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(email, password);
      //thunkAPI.dispatch(setMessage("Logged in successfully"));
      return { user: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

//logout user
export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});


//define initial states
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };


const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});
const { reducer } = authSlice;
export const selectUser = (state) => state.auth.isLoggedIn;
export const userData = (state) => state.auth.user;
export default reducer;
