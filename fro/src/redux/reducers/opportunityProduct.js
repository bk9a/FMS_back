import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {
  setLoading,
  setAlert,
  setAlertMessege,
  setAlertStatus,
} from "./system";
import helper from "../../helper/helper";
import { setToken } from "./system";
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export const slice = createSlice({
  name: "opportunityProduct",
  initialState: {
    loading: false,
    alert: null,
    dialog: null,
    searchValue: "",
    data: {
      list: [],
      count: 0,
    },

    colsearch: {
      ProductID: "",
      RiskID: "",
    },
    formData: {
      ProductID: null,
      RiskID: null,
    },
    fieldConfig: {
      RoleID: {
        loading: true,
        dataSources: [],
      },
    },
    selectData: [],
  },
  reducers: {
    setLocalLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setFieldDataSource: (state, { payload: { fieldName, dataSource } }) => {
      state.fieldConfig[fieldName].dataSources = dataSource;
    },
    setFieldLoading: (state, { payload: { fieldName, loading } }) => {
      state.fieldConfig[fieldName].loading = loading;
    },
    setSearchValue1: (state, { payload }) => {
      state.searchValue = payload;
    },
    setDialog: (state, { payload }) => {
      state.dialog = payload;
    },
    setFormFieldData: (state, { payload: { fieldName, value } }) => {
      state.formData[fieldName] = value;
    },
    setSearchFieldData: (state, { payload: { fieldName, value } }) => {
      state.colsearch[fieldName] = value;
    },
    setFormSelectData: (state, { payload: { fieldName, value } }) => {
      state.formData[fieldName] = value;
    },
    setFormData: (state, { payload }) => {
      state.formData = payload;
    },
    setClearFormData: (state) => {
      state.formData = {
        RiskID: null,
      };
      state.dialog = false;
    },
    setData: (state, { payload }) => {
      state.data = payload;
    },
    setSelectData: (state, { payload }) => {
      state.selectData = payload;
    },
  },
});

export const {
  setSearchValue1,
  setDialog,
  setData,
  setFormData,
  setFormFieldData,

  setSelectData,
  setClearFormData,
  setFieldDataSource,
  setFieldLoading,
  setLocalLoading,
  setSearchFieldData,
} = slice.actions;

export const loadUsers = ({ page, rowsPerPage }) => async (
  dispatch,
  getState
) => {
  try {
    var params = getState().opportunityProduct.colsearch;
    params = JSON.stringify(params);
    dispatch(setLocalLoading(true));

    const res = await helper.CallServiceWorker({
      url: "product-package-service",
      params,
      page,
      rowsPerPage,
    });

    const reqData = res.data.data.data;
    dispatch(
      setData({
        list: reqData,
        count: res.data.data.count,
      })
    );
    if (res.data.success === true) {
      dispatch(setAlert(true));
      dispatch(setAlertStatus(true));
      dispatch(setAlertMessege("Амжилттай"));
      dispatch(setClearFormData());
    } else {
      dispatch(setAlert(true));
      dispatch(setAlertStatus(false));
      dispatch(setAlertMessege("Login хийнэ үү!!!"));
      dispatch(setToken(null));
    }

    dispatch(setLocalLoading(false));
  } catch (error) {
    console.log(error);
    dispatch(setLocalLoading(false));
    dispatch(setAlert({ message: "Алдаа гарлаа", success: false }));
  }
};

export const SaveFormData = () => async (dispatch, getState) => {
  try {
    var token = helper.getToken();
    dispatch(setLoading(true));

    const currentState = getState().opportunityProduct.formData;
    if (currentState.UserID) {
      const res = await helper.UpdateServiceWorker({
        url: "product-package-service",
        currentState,
        id: currentState.UserID,
      });
      if (res.data.success === true) {
        dispatch(setAlert(true));
        dispatch(setAlertStatus(true));
        dispatch(setAlertMessege("Амжилттай"));
        dispatch(setClearFormData());
        dispatch(loadUsers({ page: 0, rowsPerPage: 100, searchValue: "" }));
      } else {
        dispatch(setAlert(true));
        dispatch(setAlertStatus(false));
        dispatch(setAlertMessege("Алдаа гарлаа"));
      }
    } else {
      const res = await helper.PostServiceWorker({
        url: "product-package-service",
        currentState,
      });
      if (res.data.success === true) {
        dispatch(setAlert(true));
        dispatch(setAlertStatus(true));
        dispatch(setAlertMessege("Амжилттай"));
        dispatch(setClearFormData());
        dispatch(loadUsers({ page: 0, rowsPerPage: 100, searchValue: "" }));
      } else {
        dispatch(setAlert(true));
        dispatch(setAlertStatus(false));
        console.log({ lol: res.data });
        dispatch(setAlertMessege(Object.values(res.data.error[0])[0]));
      }
    }

    dispatch(setLoading(false));
  } catch (error) {
    console.log(error);
    dispatch(setLoading(false));
    dispatch(setAlert({ message: "Алдаа гарлаа", success: false }));
  }
};

export default slice.reducer;
