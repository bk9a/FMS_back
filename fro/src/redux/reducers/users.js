import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {
  setLoading,
  setAlert,
  setAlertMessege,
  setAlertStatus
} from "./system";
import helper from "../../helper/helper";
import { setToken ,setUserData} from "./system";
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export const slice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    alert: null,
    dialog: null,
    noti: 0,
    searchValue: "",
    data: {
      list: [],
      count: 0,
    },

    colsearch: {
      UserName: "",
      EmpFirstName: "",
      EmpLastName: "",
      RoleID: "",
    },
    formData: {
      name: null,
      phone: null,

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
    setNoti: (state, { payload }) => {
      state.noti = payload;
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
        UserName: null,
        Password: null,
        EmpFirstName: null,
        EmpLastName: null,
        RoleID: null,
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
  setSearchValue1,
  setDialog,
  setData,
  setFormData,
  setFormFieldData,
  setNoti,
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
    var params = getState().users.colsearch;
    params = JSON.stringify(params);
    dispatch(setLocalLoading(true));

    const res = await helper.CallServiceWorker({
      url: "users",
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

    const currentState = getState().users.formData;
    if (currentState.UserID) {
      const res = await helper.UpdateServiceWorker({
        url: "users",
        currentState,
        id: currentState.UserID,
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
      const res = await helper.PostServiceWorker({
        url: "users",
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
        dispatch(setAlertStatus(false));
        console.log({ lol: res.data });
        dispatch(setLoading(false));
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
  var token = helper.getToken();
  try {
    dispatch(setLoading(true));

    const res = await helper.DeleteServiceWorker({
      url: "users",
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
  var token = helper.getToken();
  try {
    dispatch(setFieldLoading({ fieldName: "RoleID", loading: true }));
    const res = await axios.get(process.env.REACT_APP_API_URL + `/users-role`, {
      headers: { authorization: "Bearer " + token },
    });
    let reqData = res.data.data.data;

    reqData = reqData.map((s) => ({ value: s.RoleID, label: s.Description }));
    reqData.push({ value: "", label: "Бүгд" });

    dispatch(setFieldDataSource({ fieldName: "RoleID", dataSource: reqData }));
    dispatch(setFieldLoading({ fieldName: "RoleID", loading: false }));
  } catch (error) {
    console.log(error);
    dispatch(setLoading(false));
    dispatch(setAlert({ message: "Алдаа гарлаа", success: false }));
  }
};

export const Login = ({username, password}) => async (dispatch, getState) => {
  try {
   
    dispatch(setLoading(true));

    if (password && password) {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + `/users/login`,
        {
          Username: username,
          Password: password,
        }
      );
      if (res.data.success === true) {
        localStorage.setItem("token", res.data.token);
      
        dispatch(setToken(res.data.token));
        dispatch(setAlert(true));
        dispatch(setAlertStatus(true));
        dispatch(setAlertMessege("Амжилттай"));
        dispatch(setClearFormData());
      } else {
        dispatch(setAlert(true));
        dispatch(setAlertStatus(false));
        dispatch(setAlertMessege(res.data.message));
      }
    }

    dispatch(setLoading(false));
  } catch (error) {
    console.log(error);
    dispatch(setLoading(false));
    dispatch(setAlert({ message: "Алдаа гарлаа", success: false }));
  }
};

export const getNotification = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    var token = helper.getToken();

    const res = await axios.get(
      process.env.REACT_APP_API_URL + `/users/get-noti`,
      { headers: { authorization: "Bearer " + token } }
    );
    if (res.data.success === true) {
      dispatch(setAlert(true));
      dispatch(setAlertStatus(true));
      dispatch(setToken(token));
      dispatch(setAlertMessege("Амжилттай"));
      dispatch(setClearFormData());
      dispatch(setNoti(res.data.data.count));
    } else {
      dispatch(setAlert(true));
      dispatch(setAlertStatus(false));
      dispatch(setToken(null));
      // localStorage.removeItem("token");

      dispatch(setAlertMessege("Та эхлээд логин хийнэ үү."));
      dispatch(setClearFormData());
    }

    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setToken(null));
    // localStorage.removeItem("token");
    dispatch(setAlert({ message: "Алдаа гарлаа", success: false }));
  }
};
export const Logout = () => async (dispatch, getState) => {
  dispatch(setToken(null));
  localStorage.removeItem("token");
};
export const checkLogin = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    var token = helper.getToken();

    //

    const res = await axios.post(
      process.env.REACT_APP_API_URL + `/users/get-user-data`,
      {},
      { headers: { authorization: "Bearer " + token } }
    );
    if (res.data.success === true) {

      // console.log(res.data.user);
      dispatch(setUserData(res.data.user))
      
      dispatch(setAlert(true));
      dispatch(setAlertStatus(true));
      dispatch(setToken(token));
      dispatch(setAlertMessege("Амжилттай"));
      dispatch(setClearFormData());
    } else {
      dispatch(setAlert(true));
      dispatch(setAlertStatus(false));
      dispatch(setToken(null));
      localStorage.removeItem("token");

      dispatch(setAlertMessege("Та эхлээд логин хийнэ үү."));
      dispatch(setClearFormData());
    }

    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setToken(null));
    localStorage.removeItem("token");
    dispatch(setAlert({ message: "Алдаа гарлаа", success: false }));
  }
};

export default slice.reducer;
