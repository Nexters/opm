import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserApiPath, UserInfo } from "opm-models";

import { Api } from "../../helpers/api";

export interface UserState extends Partial<UserInfo> {}

const initialState: UserState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (_, action: PayloadAction<UserInfo>) => {
      return { ...action.payload };
    },
    logout: () => {
      // TODO: redux-saga, thunk 등으로 비동기 제어가 필요함.
      Api.get(UserApiPath.logout);
      return {};
    },
  },
});

export const { login, logout } = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
