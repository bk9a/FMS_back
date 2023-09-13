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
  name: "contact",
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
      ContactName: "",
      LegalEntityRegisterNo: "",

      Type: "",
      WorkLegalEntityID: "",
      Phone: "",
      Email: "",
      URL: "",
      Address: "",
      ContactNote: "",
      "legal_entity.LegalEntityRegisterNo": "",
    },
    formData: {
      ContactName: "",
      LegalEntityRegisterNo: "",
      SourceType: "",
      Type: "",
      WorkLegalEntityID: "",
      Phone: "",
      Email: "",
      URL: "",
      Address: "",
      ContactNote: "",
      CompanyIndustryID: "",
    },
    fieldConfig: {
      CompanyIndustryID: {
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
    setFieldDataSource: (state, { payload: { fieldName, dataSources } }) => {
      state.fieldConfig[fieldName].dataSources = dataSources;
    },
    setLocalLoading: (state, { payload }) => {
      state.loading = payload;
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
      state.formData = {
        ...payload,
        LegalEntityRegisterNo: payload.legal_entity.LegalEntityRegisterNo,
      };
    },
    setClearFormData: (state) => {
      state.formData = {
        ContactName: "",
        LegalEntityRegisterNo: "",
        SourceType: "",
        Type: "",
        WorkLegalEntityID: "",
        Phone: "",
        Email: "",
        URL: "",
        Address: "",
        ContactNote: "",
        CompanyIndustryID: "",
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
    var params = getState().contact.colsearch;
    params = JSON.stringify(params);
    dispatch(setLoading(true));

    const res = await helper.CallServiceWorker({
      url: "contact",
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

    dispatch(setLoading(false));
  } catch (error) {
    console.log(error);
    dispatch(setLoading(false));
    dispatch(setAlert({ message: "Алдаа гарлаа", success: false }));
  }
};

export const SaveFormData = () => async (dispatch, getState) => {
  try {
    var token = helper.getToken();
    dispatch(setLoading(true));

    const currentState = getState().contact.formData;
    if (currentState.ContactID) {
      const res = await axios.put(
        process.env.REACT_APP_API_URL + `/contact/${currentState.ContactID}`,
        currentState,
        { headers: { authorization: "Bearer " + token } }
      );
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
      const res = await axios.post(
        process.env.REACT_APP_API_URL + `/contact`,
        currentState,
        { headers: { authorization: "Bearer " + token } }
      );
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

export const DeleteFormData = (id) => async (dispatch) => {
  var token = helper.getToken();
  try {
    dispatch(setLoading(true));

    const res = await axios.delete(
      process.env.REACT_APP_API_URL + `/contact/${id}`,
      { headers: { authorization: "Bearer " + token } }
    );

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
    dispatch(
      setFieldLoading({ fieldName: "CompanyIndustryID", loading: true })
    );
    //
    const res = await axios.post(
      process.env.REACT_APP_API_URL + `/company-industry/select`,
      {},
      { headers: { authorization: "Bearer " + token } }
    );
    let reqData = res.data.data.data;

    reqData = reqData.map((s) => ({
      value: s.CompanyIndustryID,
      label: s.Description,
    }));

    dispatch(
      setFieldDataSource({
        fieldName: "CompanyIndustryID",
        dataSources: reqData,
      })
    );
    dispatch(
      setFieldLoading({ fieldName: "CompanyIndustryID", loading: false })
    );
  } catch (error) {
    console.log(error);
    dispatch(setLoading(false));
    dispatch(setAlert({ message: "Алдаа гарлаа", success: false }));
  }
};

export const Logout = () => async (dispatch, getState) => {
  dispatch(setToken(null));
  localStorage.removeItem("token");
};

export const LoadSingleUser = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    const currentState = getState().contact.formData;
    const id = getState().contact.formData[
      "legal_entity.LegalEntityRegisterNo"
    ];
    const Type = getState().contact.formData["Type"];
    const res = await helper.SingleSearchCreateWorker({
      url: "opportunity",
      id,
      Type,
    });

    if (res.data.success === true) {
      const reqData = res.data.data;

      const fieldName = "ContactName";

      const value = reqData.LegalEntityName;

      const LegalEntityID = reqData.LegalEntityId;

      dispatch(setFormFieldData({ fieldName, value }));
      dispatch(setFormFieldData({ fieldName: "ContactName", value }));
      dispatch(
        setFormFieldData({ fieldName: "LegalEntityId", value: LegalEntityID })
      );
      dispatch(setAlert(true));
      dispatch(setAlertStatus(true));
      dispatch(setAlertMessege("Байгууллага амжилттай татлаа."));
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
export const LoadSinglePerson = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    const currentState = getState().contact.formData;
    const id = getState().contact.formData[
      "legal_entity.LegalEntityRegisterNo"
    ];
    const Type = getState().contact.formData["Type"];

    const res = await helper.SingleSearchCreateWorker({
      url: "opportunity",
      id,
      Type,
    });

    if (res.data.success === true) {
      const reqData = res.data.data;

      const LegalEntityName = reqData.LegalEntityName;

      dispatch(
        setFormFieldData({
          fieldName: "WorkLegalEntityID",
          value: reqData.LegalEntityRegisterNo,
        })
      );
      dispatch(
        setFormFieldData({
          fieldName: "LegalEntityName",
          value: LegalEntityName,
        })
      );
      dispatch(setAlert(true));
      dispatch(setAlertStatus(true));
      dispatch(setAlertMessege("Байгууллага амжилттай татлаа."));
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

export default slice.reducer;
