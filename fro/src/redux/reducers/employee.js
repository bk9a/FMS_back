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
  name: "employee",
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
      OpportunityOwnerID: "",
      OpportunityID: "",
      UserID: "",
      UserPercent: "",
      ContactID: "",
    },
    formData: {
      EmployeePositionID: null,
      EmployeeName: null,
      EmployeePhone: null,
      Email: null,
      ContactID: null,
    },
    fieldConfig: {
      EmployeePositionID: {
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
        OpportunityOwnerID: null,
        UserID: null,
        UserPercent: null,
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
    var params = getState().employee.colsearch;
    params = JSON.stringify(params);
    dispatch(setLocalLoading(true));

    const res = await helper.CallServiceWorker({
      url: "employee",
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
      dispatch(Clears());
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

export const Clears = () => async (dispatch, getState) => {
  dispatch(setFormFieldData({ fieldName: "UserID", value: null }));
  dispatch(setFormFieldData({ fieldName: "OpportunityOwnerID", value: null }));
  dispatch(setFormFieldData({ fieldName: "UserPercent", value: null }));
  dispatch(setDialog(false));
};
export const SaveFormData = () => async (dispatch, getState) => {
  try {
    var token = helper.getToken();
    dispatch(setLoading(true));

    const currentState = getState().employee.formData;
    if (currentState.EmployeeID) {
      const res = await helper.UpdateServiceWorker({
        url: "employee",
        currentState,
        id: currentState.EmployeeID,
      });
      if (res.data.success === true) {
        dispatch(setAlert(true));
        dispatch(setAlertStatus(true));
        dispatch(setAlertMessege("Амжилттай"));
        dispatch(Clears());
        dispatch(loadUsers({ page: 0, rowsPerPage: 100, searchValue: "" }));
      } else {
        dispatch(setAlert(true));
        dispatch(setAlertStatus(false));
        dispatch(setAlertMessege(Object.values(res.data.error[0])[0]));
      }
    } else {
      const res = await helper.PostServiceWorker({
        url: "employee",
        currentState,
      });
      if (res.data.success === true) {
        dispatch(setAlert(true));
        dispatch(setAlertStatus(true));
        dispatch(setAlertMessege("Амжилттай"));
        dispatch(Clears());
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

export const DeleteFormData = (id) => async (dispatch) => {
  var token = helper.getToken();
  try {
    dispatch(setLoading(true));

    const res = await helper.DeleteServiceWorker({
      url: "employee",
      id,
    });

    if (res.data.success === true) {
      dispatch(setAlert(true));
      dispatch(setAlertStatus(true));
      dispatch(setAlertMessege("Амжилттай"));
      dispatch(loadUsers({ page: 0, rowsPerPage: 100, searchValue: "" }));
    } else {
      dispatch(setAlert(true));
      dispatch(setAlertStatus(false));
      dispatch(setAlertMessege(Object.values(res.data.error[0])[0]));
    }
    dispatch(setLoading(false));
  } catch (error) {
    console.log(error);
    dispatch(setLoading(false));
    dispatch(setAlert({ message: "Алдаа гарлаа", success: false }));
  }
};

export const loadDataSourceRole = () => async (dispatch) => {
  var token = helper.getToken();
  try {
    dispatch(
      setFieldLoading({ fieldName: "EmployeePositionID", loading: true })
    );
    let par = {
      Description: "",
      IsActive: true,
    };
    par = JSON.stringify(par);
    const res = await helper.CallServiceWorker({
      url: "employee-position",
      params: par,
      page: 0,
      rowsPerPage: 100,
    });

    let reqData = res.data.data.data;

    reqData = reqData.map((s) => ({
      value: s.EmployeePositionID,
      label: s.Description,
    }));
    // reqData.push({ value: "", label: "Бүгд" });

    dispatch(
      setFieldDataSource({
        fieldName: "EmployeePositionID",
        dataSource: reqData,
      })
    );
    dispatch(
      setFieldLoading({ fieldName: "EmployeePositionID", loading: false })
    );
  } catch (error) {
    console.log(error);
    dispatch(setLoading(false));
    dispatch(setAlert({ message: "Алдаа гарлаа", success: false }));
  }
};

export default slice.reducer;
