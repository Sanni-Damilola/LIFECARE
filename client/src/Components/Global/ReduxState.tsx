/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { consultData, hospitalData, UserData } from "../interface/interface";

const initialState = {
  currentUser: {} as UserData | null,
  consultUser: {} as consultData | null,
  hospitalUser: {} as hospitalData | null,
};

const ReduxState = createSlice({
  name: "lifeCare",
  initialState,
  reducers: {
    User: (state, { payload }: PayloadAction<UserData>) => {
      state.currentUser = payload;
    },

    Consultant: (state, {payload}: PayloadAction<consultData>) => {
      state.consultUser = payload;
    },

    Hospital: (state, {payload}: PayloadAction<hospitalData>) => {
      state.hospitalUser = payload;
    },

    logout: (state) => {
      state.currentUser = null;
    },
  },
});

export const { User, Consultant, Hospital, logout } = ReduxState.actions;

export default ReduxState.reducer;
