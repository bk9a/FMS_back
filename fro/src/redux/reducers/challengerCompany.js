import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import helper from "../../helper/helper";
import { setToken } from "./system";
import {
  setLoading,
  setAlert,
  setAlertMessege,
  setAlertStatus,
} from "./system";

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export const slice = createSlice({
  name: "challengerCompany",
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
      CompanyName: "",
      RegisterNo: "",
      IsActive: true,
    },
    formData: {
      CompanyName: null,
      RegisterNo: null,
      IsActive: null,
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
    setSearchFieldData: (state, { payload: { fieldName, value } }) => {
      state.colsearch[fieldName] = value;
    },
    setLocalLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setFieldDataSource: (state, { payload: { fieldName, dataSource } }) => {
      state.fieldConfig[fieldName].dataSource = dataSource;
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
    setFormSelectData: (state, { payload: { fieldName, value } }) => {
      state.formData[fieldName] = value;
    },
    setFormData: (state, { payload }) => {
      state.formData = payload;
    },
    setClearFormData: (state) => {
      state.formData = {
        CompanyName: null,
        RegisterNo: null,
        IsActive: null,
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
  setLocalLoading,
  setSearchFieldData,
  setSearchValue1,
  setDialog,
  setData,
  setFormData,
  setFormFieldData,
  setSelectData,
  setClearFormData,
  setFieldDataSource,
  setFieldLoading,
} = slice.actions;

export const loadUsers = ({ page, rowsPerPage }) => async (
  dispatch,
  getState
) => {
  try {
    var params = getState().challengerCompany.colsearch;
    params = JSON.stringify(params);
    var token = helper.getToken();
    dispatch(setLocalLoading(true));

    const res = await helper.CallServiceWorker({
      url: "challenger-company",
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
    dispatch(setLoading(true));

    const currentState = getState().challengerCompany.formData;
    if (currentState.ChallengerCompanyID) {
      // const res = await axios.put(
      //   process.env.REACT_APP_API_URL +
      //     `/challenger-company/${currentState.ChallengerCompanyID}`,
      //   currentState
      // );

      const res = await helper.UpdateServiceWorker({
        url: "challenger-company",
        currentState,
        id: currentState.ChallengerCompanyID,
      });

      if (res.data.success === true) {
        dispatch(setAlert(true));
        dispatch(setAlertStatus(true));
        dispatch(setAlertMessege("Амжилттай"));
        dispatch(setClearFormData());
        dispatch(setLoading(false));
        dispatch(loadUsers({ page: 0, rowsPerPage: 100, searchValue: "" }));
      } else {
        dispatch(setAlert(true));
        dispatch(setLoading(false));
        dispatch(setAlertStatus(false));
        dispatch(setAlertMessege(Object.values(res.data.error[0])[0]));
      }
    } else {
      // const res = await axios.post(
      //   process.env.REACT_APP_API_URL + `/challenger-company`,
      //   currentState
      // );

      const res = await helper.PostServiceWorker({
        url: "challenger-company",
        currentState,
      });
      if (res.data.success === true) {
        dispatch(setAlert(true));
        dispatch(setAlertStatus(true));
        dispatch(setAlertMessege("Амжилттай"));
        dispatch(setClearFormData());
        dispatch(setLoading(false));
        dispatch(loadUsers({ page: 0, rowsPerPage: 100, searchValue: "" }));
      } else {
        dispatch(setAlert(true));
        dispatch(setLoading(false));
        dispatch(setAlertStatus(false));
        dispatch(setAlertMessege(Object.values(res.data.error[0])[0]));
      }
    }
  } catch (error) {
    console.log(error);
    dispatch(setLoading(false));
    dispatch(setAlert({ message: "Алдаа гарлаа", success: false }));
  }
};

export const DeleteFormData = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    // const res = await axios.delete(
    //   process.env.REACT_APP_API_URL + `/challenger-company/${id}`
    // );
    const res = await helper.DeleteServiceWorker({
      url: "challenger-company",
      id,
    });
    if (res.data.success === true) {
      dispatch(setAlert(true));
      dispatch(setAlertStatus(true));
      dispatch(setAlertMessege("Амжилттай"));
    } else {
      dispatch(setAlert(true));
      dispatch(setAlertStatus(false));
      dispatch(setAlertMessege("Алдаа гарлаа"));
    }
    dispatch(setLoading(false));
    dispatch(loadUsers({ page: 0, rowsPerPage: 100, searchValue: "" }));
  } catch (error) {
    console.log(error);
    dispatch(setLoading(false));
    dispatch(setAlert({ message: "Алдаа гарлаа", success: false }));
  }
};

export default slice.reducer;
