import { createSlice } from "@reduxjs/toolkit";
import helper from "../../helper/helper";
export const slice = createSlice({
  name: "system",
  initialState: {
    sysLoading: true,
    loading: false,
    alert: null,
    // token: helper.getToken(),
    token: null,
    alertStatus: null,
    alertMessege: null,
  },
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setSysLoading: (state, { payload }) => {
      state.sysLoading = payload;
    },
    setToken: (state, { payload }) => {
      state.token = payload;
      state.sysLoading = false;
    },
    setAlert: (state, { payload }) => {
      state.alert = payload;
    },
    setAlertMessege: (state, { payload }) => {
      state.alertMessege = payload;
    },
    setAlertStatus: (state, { payload }) => {
      state.alertStatus = payload;
    },
  },
});

export const {
  setToken,
  setLoading,
  setAlert,
  setAlertMessege,
  setAlertStatus,
  setSysLoading,
} = slice.actions;

export default slice.reducer;
