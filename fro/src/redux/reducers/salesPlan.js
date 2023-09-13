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
  name: "salesPlan",
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
      SalesPlanYear: "",
      SalesManagerID: "",
      "users.EmpFirstName": "",
      PlanAmount: "",
    },
    formData: {
      SalesPlanYear: null,
      SalesManagerID: null,
      PlanAmount: null,
    },
    fieldConfig: {
      SalesManagerID: {
        loading: true,
        dataSources: [],
      },
      SalesPlanYear: {
        loading: false,
        dataSources: [
          {
            value: 2020,
            label: 2020,
          },
          {
            value: 2021,
            label: 2021,
          },
          {
            value: 2022,
            label: 2022,
          },
          {
            value: 2023,
            label: 2023,
          },
          {
            value: 2024,
            label: 2024,
          },
        ],
      },
      PlanMonth: {
        loading: false,
        dataSources: [
          {
            value: 1,
            label: "1 сар",
          },
          {
            value: 2,
            label: "2 сар",
          },
          {
            value: 3,
            label: "3 сар",
          },
          {
            value: 4,
            label: "4 сар",
          },
          {
            value: 5,
            label: "5 сар",
          },
          {
            value: 6,
            label: "6 сар",
          },
          {
            value: 7,
            label: "7 сар",
          },
          {
            value: 8,
            label: "8 сар",
          },
          {
            value: 9,
            label: "9 сар",
          },
          {
            value: 10,
            label: "10 сар",
          },
          {
            value: 11,
            label: "11 сар",
          },
          {
            value: 12,
            label: "12 сар",
          },
        ],
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
        SalesPlanYear: null,
        SalesManagerID: null,
        PlanAmount: null,
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
    var params = getState().salesPlan.colsearch;
    params = JSON.stringify(params);
    dispatch(setLocalLoading(true));

    const res = await helper.CallServiceWorker({
      url: "sales-plan",
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

    const currentState = getState().salesPlan.formData;
    if (currentState.SalesPlanID) {
      const res = await helper.UpdateServiceWorker({
        url: "sales-plan",
        currentState,
        id: currentState.SalesPlanID,
      });
      if (res.data.success === true) {
        dispatch(setAlert(true));
        dispatch(setAlertStatus(true));
        dispatch(setAlertMessege("Амжилттай"));
        dispatch(setClearFormData());
      } else {
        dispatch(setAlert(true));
        dispatch(setAlertStatus(false));
        dispatch(setAlertMessege("Алдаа гарлаа"));
      }
    } else {
      const res = await helper.PostServiceWorker({
        url: "sales-plan",
        currentState,
      });
      if (res.data.success === true) {
        dispatch(setAlert(true));
        dispatch(setAlertStatus(true));
        dispatch(setAlertMessege("Амжилттай"));
        dispatch(setClearFormData());
      } else {
        dispatch(setAlert(true));
        dispatch(setAlertStatus(false));
        console.log({ lol: res.data });
        dispatch(setAlertMessege(Object.values(res.data.error[0])[0]));
      }
    }

    dispatch(setLoading(false));
    dispatch(loadUsers({ page: 0, rowsPerPage: 100, searchValue: "" }));
  } catch (error) {
    console.log(error);
    dispatch(setLoading(false));
    dispatch(setAlert({ message: "Алдаа гарлаа", success: false }));
  }
};

export const DeleteFormData = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const res = await helper.DeleteServiceWorker({
      url: "sales-plan",
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

export const loadDataSourceRole = () => async (dispatch) => {
  let params = { UserName: "", EmpFirstName: "", EmpLastName: "", RoleID: 2 };
  params = JSON.stringify(params);
  try {
    dispatch(setFieldLoading({ fieldName: "SalesManagerID", loading: true }));

    const res = await helper.CallServiceWorker({
      url: "users",
      params,
      page: null,
      rowsPerPage: null,
    });
    let reqData = res.data.data.data;

    reqData = reqData.map((s) => ({ value: s.UserID, label: s.EmpFirstName }));

    dispatch(
      setFieldDataSource({ fieldName: "SalesManagerID", dataSource: reqData })
    );
    dispatch(setFieldLoading({ fieldName: "SalesManagerID", loading: false }));
  } catch (error) {
    console.log(error);
    dispatch(setLoading(false));
    dispatch(setAlert({ message: "Алдаа гарлаа", success: false }));
  }
};

export default slice.reducer;
