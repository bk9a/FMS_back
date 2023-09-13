import { createSlice } from "@reduxjs/toolkit";
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
  name: "riskList",
  initialState: {
    loading: false,
    alert: null,
    dialog: null,
    searchValue: "",
    data: {
      list: [],
      count: 0,
    },
    tempData: {
      RiskDetailName: null,
      IsActive: 0,
      ProductRiskDetailID: null,
    },
    colsearch: {
      RiskName: "",
    },
    formData: {
      productRisk: { RiskName: null },
      productRiskDetails: [],
    },
    fieldConfig: {},
    selectData: [],
  },
  reducers: {
    setSearchFieldData: (state, { payload: { fieldName, value } }) => {
      state.colsearch[fieldName] = value;
    },
    setFieldDataSource: (state, { payload: { fieldName, dataSource } }) => {
      state.fieldConfig[fieldName].dataSource = dataSource;
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
      state.formData.productRisk[fieldName] = value;
    },
    setFormSelectData: (state, { payload: { fieldName, value } }) => {
      state.formData[fieldName] = value;
    },
    setFormData: (state, { payload }) => {
      state.formData.productRisk = payload;
    },
    setFormDataDetail: (state, { payload }) => {
      state.formData.productRiskDetails = payload;
    },
    changeItem: (state, { payload: { index, value } }) => {
      state.formData.productRiskDetails[index] = { ...value };
    },
    addFormDataDetail: (state, { payload }) => {
      state.formData.productRiskDetails.push(payload);
    },

    setClearFormData: (state) => {
      state.formData = {
        productRisk: { RiskName: null },
        productRiskDetails: [],
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
  addFormDataDetail,
  setSearchValue1,
  setDialog,
  setData,
  setFormData,
  setFormDataDetail,
  setFormFieldData,
  setSelectData,
  setClearFormData,
  setFieldDataSource,
  setFieldLoading,
  changeItem,
} = slice.actions;

export const loadUsers = ({ page, rowsPerPage }) => async (
  dispatch,
  getState
) => {
  try {
    var params = getState().riskList.colsearch;
    params = JSON.stringify(params);

    dispatch(setLocalLoading(true));

    const res = await helper.CallServiceWorker({
      url: "product-risk",
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
export const LoadSingleUser = (row) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));

    const id = row.ProductRiskID
      ? row.ProductRiskID
      : row.RiskID
      ? row.RiskID
      : null;
    // const currentState = getState().riskList.formData;
    if (id) {
      // const res = await axios.get(
      //   process.env.REACT_APP_API_URL + `/product-risk/${id}`
      // );

      const res = await helper.SingleServiceWorker({
        url: "product-risk",
        id,
      });

      if (res.data.success === true) {
        dispatch(setFormData(res.data.data));
        const reqData = res.data.data.product_risk_detail;
        dispatch(setFormDataDetail(reqData));
      } else {
        dispatch(setAlert(true));
        dispatch(setAlertStatus(false));
        dispatch(setAlertMessege("Алдаа гарлаа"));
      }
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
    dispatch(setLoading(true));

    const currentState = getState().riskList.formData;
    if (currentState.productRisk.RiskID) {
      const res = await helper.UpdateServiceWorker({
        url: "product-risk",
        currentState,
        id: currentState.productRisk.RiskID,
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
        dispatch(setAlertMessege("Алдаа гарлаа"));
        dispatch(setLoading(false));
        dispatch(setAlertMessege(Object.values(res.data.error[0])[0]));
      }
    } else {
      const res = await helper.PostServiceWorker({
        url: "product-risk",
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
  try {
    dispatch(setLoading(true));

    const res = await helper.DeleteServiceWorker({
      url: "product-risk",
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

export const DeleteRiskDetail = (row) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));

    if (row.ProductRiskDetailID) {
      //   const res = await axios.delete(
      //     process.env.REACT_APP_API_URL +
      //       `/product-risk-detail/${row.ProductRiskDetailID}`
      //   );

      const res = await helper.DeleteServiceWorker({
        url: "product-risk-detail",
        id: row.ProductRiskDetailID,
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
      dispatch(LoadSingleUser(row));
    } else {
      var currentState = getState().riskList.formData.productRiskDetails;
      currentState = currentState.filter(function (obj) {
        return obj !== row;
      });

      dispatch(setFormDataDetail(currentState));
      dispatch(setLoading(false));
    }
  } catch (error) {
    console.log(error);
    dispatch(setLoading(false));
    dispatch(setAlert({ message: "Алдаа гарлаа", success: false }));
  }
};

export default slice.reducer;
