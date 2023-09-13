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
  name: "opportunityDetail",
  initialState: {
    loading: false,
    alert: null,
    dialog: null,
    searchValue: "",
    data: {
      list: [],
      count: 0,
    },
    detailData: {},

    colsearch: {
      OpportunityID: "",
    },
    formData: {
      OpportunityID: null,
    },
    fieldConfig: {
      ProductID: {
        loading: true,
        dataSources: [],
      },
      RiskID: {
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
    setDetailData: (state, { payload }) => {
      state.detailData = payload;
    },
    changeItem: (state, { payload: { mainindex, index, value } }) => {
      console.log({ mainindex, index, value });
      // state.detailData.product_package[mainindex] &&
      //   state.detailData.product_package[mainindex].product_package_detail[
      //     index
      //   ] &&
      //   state.detailData.product_package[mainindex].product_package_detail[
      //     index
      //   ].IsActive &&
      state.detailData.product_package[mainindex].product_package_detail[
        index
      ].IsActive = value;
    },
    setClearFormData: (state) => {
      state.formData = {
        // InteractionID: null,
        // InteractionTypeID: null,
        // InteractionDate: null,
        // Note: null,
        // CountPeople: null,
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
  changeItem,
  setFormData,
  setFormFieldData,
  setDetailData,
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
    var params = getState().opportunityDetail.colsearch;
    params = JSON.stringify(params);
    dispatch(setLocalLoading(true));

    const res = await helper.CallServiceWorker({
      url: "opportunity-detail",
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

    let currentState1 = getState().opportunityDetail.formData;

    let reqData = getState().opportunityDetail.detailData;

    if (currentState1.ProductPackageID) {
      reqData.product_package.map((item) => {
        if (item.ProductPackageID === currentState1.ProductPackageID) {
          dispatch(
            setFormFieldData({
              fieldName: "product_package_detail",
              value: item.product_package_detail,
            })
          );
        }
      });
    }
    const currentState = getState().opportunityDetail.formData;

    if (currentState.OpportunityDetailID) {
      const res = await helper.UpdateServiceWorker({
        url: "opportunity-detail",
        currentState,
        id: currentState.OpportunityDetailID,
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
        url: "opportunity-detail",
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

export const DeleteFormData = (id) => async (dispatch) => {
  var token = helper.getToken();
  try {
    dispatch(setLoading(true));

    const res = await helper.DeleteServiceWorker({
      url: "opportunity-detail",
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
      dispatch(setAlertMessege("Алдаа гарлаа"));
    }
    dispatch(setLoading(false));
  } catch (error) {
    console.log(error);
    dispatch(setLoading(false));
    dispatch(setAlert({ message: "Алдаа гарлаа", success: false }));
  }
};

export const loadDataSourceRole = () => async (dispatch, getState) => {
  var token = helper.getToken();
  var params = getState().opportunityDetail.colsearch;
  params = JSON.stringify(params);

  try {
    dispatch(setFieldLoading({ fieldName: "ProductID", loading: true }));
    dispatch(setFieldLoading({ fieldName: "RiskID", loading: true }));
    const res = await axios.get(
      process.env.REACT_APP_API_URL + `/product-pdetail`,
      {
        headers: { authorization: "Bearer " + token },
      }
    );
    let reqData = res.data.data.data;
    reqData = reqData.map((s) => ({
      value: s.ProductID,
      label: s.ProductName,
    }));

    const res1 = await axios.get(
      process.env.REACT_APP_API_URL + `/select-risk`,
      {
        headers: { authorization: "Bearer " + token },
      }
    );

    let reqData1 = res1.data.data.data;
    reqData1 = reqData1.map((s) => ({
      value: s.RiskID,
      label: s.RiskName,
    }));
    dispatch(
      setFieldDataSource({
        fieldName: "RiskID",
        dataSource: reqData1,
      })
    );
    dispatch(
      setFieldDataSource({
        fieldName: "ProductID",
        dataSource: reqData,
      })
    );

    dispatch(setFieldLoading({ fieldName: "ProductID", loading: false }));
    dispatch(setFieldLoading({ fieldName: "RiskID", loading: false }));
  } catch (error) {
    console.log(error);
    dispatch(setLoading(false));
    dispatch(setAlert({ message: "Алдаа гарлаа", success: false }));
  }
};

export const loadDetailData = (id) => async (dispatch, getState) => {
  try {
    const currentState = getState().opportunityDetail.formData;

    const res = await helper.SingleServiceWorker({
      url: "product",
      id,
    });
    let reqData = res.data.data;

    if (currentState.ProductPackageID) {
      reqData.product_package.map((item) => {
        if (item.ProductPackageID === currentState.ProductPackageID) {
          for (let i = 0; i < item.product_package_detail.length; i++) {
            item.product_package_detail[i] = {
              ...item.product_package_detail[i],
              ...currentState.opportunity_detail_package[i],
            };
          }
        } else {
          for (let i = 0; i < item.product_package_detail.length; i++) {
            item.product_package_detail[i] = {
              ...item.product_package_detail[i],
              OpportunityDetailPackageID:
                currentState.opportunity_detail_package[i]
                  .OpportunityDetailPackageID,
            };
          }
        }
      });
      dispatch(setDetailData(reqData));
    } else {
      dispatch(setDetailData(reqData));
    }
  } catch (error) {
    console.log(error);
    dispatch(setLoading(false));
    dispatch(setAlert({ message: "Алдаа гарлаа", success: false }));
  }
};

export const addRisk = ({ ProductID, RiskID }) => async (
  dispatch,
  getState
) => {
  try {
    if (RiskID) {
      const currentState = { ProductID, RiskID };
      console.log({ ProductID, RiskID });
      const res = await helper.PostServiceWorker({
        url: "opportunity-detail/service-create",
        currentState,
      });
      if (res.data.success === true) {
        dispatch(setAlert(true));
        dispatch(setAlertStatus(true));
        dispatch(setAlertMessege("Амжилттай"));
        dispatch(setFormFieldData({ fieldName: "ProductID", value: 0 }));
        dispatch(
          setFormFieldData({ fieldName: "ProductID", value: ProductID })
        );
      } else {
        dispatch(setAlert(true));
        dispatch(setAlertStatus(false));
        dispatch(setAlertMessege(Object.values(res.data.error[0])[0]));
      }
      dispatch(setLoading(false));
    } else {
      dispatch(setAlert(true));
      dispatch(setAlertStatus(false));
      dispatch(setAlertMessege("Эрсдэл сонгоно уу"));
    }
  } catch (error) {
    console.log(error);
    dispatch(setLoading(false));
    dispatch(setAlert({ message: "Алдаа гарлаа", success: false }));
  }
};

export const addPackage = ({ ProductID }) => async (dispatch, getState) => {
  try {
    const PackageName = getState().opportunityDetail.formData.PackageName;
    if (PackageName) {
      const currentState = { ProductID, PackageName };

      const res = await helper.PostServiceWorker({
        url: "opportunity-detail/package-create",
        currentState,
      });
      if (res.data.success === true) {
        dispatch(setAlert(true));
        dispatch(setAlertStatus(true));
        dispatch(setAlertMessege("Амжилттай"));
        dispatch(setFormFieldData({ fieldName: "ProductID", value: 0 }));
        dispatch(
          setFormFieldData({ fieldName: "ProductID", value: ProductID })
        );
      } else {
        dispatch(setAlert(true));
        dispatch(setAlertStatus(false));
        dispatch(setAlertMessege(Object.values(res.data.error[0])[0]));
      }
      dispatch(setLoading(false));
    } else {
      dispatch(setAlert(true));
      dispatch(setAlertStatus(false));
      dispatch(setAlertMessege("Нэр сонгоно уу"));
    }
  } catch (error) {
    console.log(error);
    dispatch(setLoading(false));
    dispatch(setAlert({ message: "Алдаа гарлаа", success: false }));
  }
};
export const saveDetails = () => async (dispatch, getState) => {
  try {
    let reqData = getState().opportunityDetail.detailData;
    let ProductID = getState().opportunityDetail.formData.ProductID;

    console.log({ reqData });
    // if (PackageName) {
    const res = await helper.PostServiceWorker({
      url: "opportunity-detail/package-update",
      currentState: reqData,
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
