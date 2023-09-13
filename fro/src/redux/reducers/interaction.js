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
  name: "interaction",
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
      "users.EmpFirstName": "",
      InteractionID: "",
      InteractionTypeID: "",
      OpportunityID: "",
      RelatedUserID: "",
      InteractionDate: "",
      Note: "",
      CountPeople: "",
    },
    formData: {
      InteractionID: null,
      InteractionTypeID: null,
      OpportunityID: null,
      RelatedUserID: null,
      InteractionDate: null,
      Note: null,
      CountPeople: null,
    },
    fieldConfig: {
      InteractionTypeID: {
        loading: true,
        dataSources: [],
      },
      RelatedUserID: {
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
        InteractionID: null,
        InteractionTypeID: null,
        InteractionDate: null,
        Note: null,
        CountPeople: null,
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
    var params = getState().interaction.colsearch;
    params = JSON.stringify(params);
    dispatch(setLocalLoading(true));

    const res = await helper.CallServiceWorker({
      url: "interaction",
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
      // dispatch(setClearFormData());
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

    const currentState = getState().interaction.formData;
    if (currentState.InteractionID) {
      const res = await helper.UpdateServiceWorker({
        url: "interaction",
        currentState,
        id: currentState.InteractionID,
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
        url: "interaction",
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
  var token = helper.getToken();
  try {
    dispatch(setLoading(true));

    const res = await helper.DeleteServiceWorker({
      url: "interaction",
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

export const loadDataSourceRole = () => async (dispatch, getState) => {
  var token = helper.getToken();
  try {
    dispatch(
      setFieldLoading({ fieldName: "InteractionTypeID", loading: true })
    );
    const res = await axios.get(
      process.env.REACT_APP_API_URL + `/select-interaction`,
      {
        headers: { authorization: "Bearer " + token },
      }
    );
    let reqData = res.data.data.data;
    reqData = reqData.map((s) => ({
      value: s.InteractionTypeID,
      label: s.Description,
    }));
    // reqData.push({ value: "", label: "Бүгд" });

    dispatch(
      setFieldDataSource({
        fieldName: "InteractionTypeID",
        dataSource: reqData,
      })
    );
    const OpportunityID = getState().interaction.formData.OpportunityID;
    let params = {
      OpportunityID: OpportunityID,
    };
    params = JSON.stringify(params);
    const resUser = await axios.get(
      process.env.REACT_APP_API_URL +
        `/select-interaction-user?params=${params}`,
      {
        headers: { authorization: "Bearer " + token },
      }
    );

    let reqDataUser = resUser.data.data.data;

    reqDataUser = reqDataUser.map((s) => ({
      value: s.users.UserID,
      label: s.users.EmpFirstName,
    }));
    // reqData.push({ value: "", label: "Бүгд" });

    dispatch(
      setFieldDataSource({
        fieldName: "RelatedUserID",
        dataSource: reqDataUser,
      })
    );

    dispatch(
      setFieldLoading({ fieldName: "InteractionTypeID", loading: false })
    );
    dispatch(setFieldLoading({ fieldName: "RelatedUserID", loading: false }));
  } catch (error) {
    console.log(error);
    dispatch(setLoading(false));
    dispatch(setAlert({ message: "Алдаа гарлаа", success: false }));
  }
};

export default slice.reducer;
