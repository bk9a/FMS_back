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
  name: "opportunity",
  initialState: {
    loading: false,
    alert: null,
    dialog: null,
    dialogClose: null,
    searchValue: "",
    repSearch: {
      EstimatedStartDate: helper.getDateYMD(helper.getThisMonth()),
      EstimatedEndDate: helper.getDateYMD(helper.getToday()),
      ContactName: "",
      "contact.legal_entity.LegalEntityRegisterNo": "",
      UserID: "",
      OpportunityCloseTypeID: "",
      ProductName: "",
      InteractionTypeID: "",
      startVal: "",
      endVal: "",
      PlanYear: 2022,
      PlanMonth: 1,
    },
    repData: { list: [], count: 0, tval: 0, tfee: 0 },
    repDataManager: { list: [], count: 0, tval: 0, tfee: 0 },
    repDataProduct: { list: [], count: 0, tval: 0, tfee: 0 },
    repDataInteraction: { list: [], count: 0, tval: 0, tfee: 0 },
    repDataTraining: { list: [], count: 0, tval: 0, tfee: 0 },
    repDataTotalInteraction: { list: [], count: 0, tval: 0, tfee: 0 },
    repDataTotalStatus: { list: [], count: 0, tval: 0, tfee: 0 },
    repDataSummary: { list: [], count: 0, tval: 0, tfee: 0 },
    repDashData: {
      list: [],
      count: 0,
      ds: {
        tender: 0,
        sanal: 0,
        geree: 0,
        nemelt: 0,
        notClosed: 0,
      },
    },
    data: {
      list: [],
      count: 0,
    },

    colsearch: {
      OpportunityDescription: "",
      OpportunityStatus: "",
      EstimatedStartDate: "",
      EstimatedEndDate: "",
      "contact.legal_entity.LegalEntityRegisterNo": "",
      "contact.ContactName": "",
      "users.EmpFirstName": "",
    },
    formData: {
      OpportunityDescription: null,
      OpportunityStatus: "Хаагдаагүй",
      OpportunityCloseType: "0",
      EstimatedStartDate: null,
      EstimatedEndDate: null,
      ChancesOfSuccess: null,
      "contact.legal_entity.LegalEntityRegisterNo": null,
      "contact.ContactName": null,
      "users.EmpFirstName": null,
      ClosedDate: null,
      ContactName: null,
      SuggestReasonID: null,
      ChallengerCompanyID: null,
      ChallengerEndCompanyDate: helper.getDateYMD(helper.getToday()),
    },
    interaction: {
      list: [],
    },
    fieldConfig: {
      OpportunityType: {
        loading: true,
        dataSources: [],
      },
      SuggestReasonID: {
        loading: true,
        dataSources: [],
      },
      ChallengerCompanyID: {
        loading: true,
        dataSources: [],
      },
      UserID: {
        loading: true,
        dataSources: [],
      },
      OpportunityCloseTypeID: {
        loading: true,
        dataSources: [],
      },
      InteractionTypeID: {
        loading: true,
        dataSources: [],
      },
      PlanYear: {
        loading: false,
        dataSources: [
          {
            value: 2020,
            label: "2020",
          },
          {
            value: 2021,
            label: "2021",
          },
          {
            value: 2022,
            label: "2022",
          },
          {
            value: 2023,
            label: "2023",
          },
          {
            value: 2024,
            label: "2024",
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
    setDialogClose: (state, { payload }) => {
      state.dialogClose = payload;
    },
    setFormFieldData: (state, { payload: { fieldName, value } }) => {
      state.formData[fieldName] = value;
    },
    setDateSearchData: (state, { payload: { fieldName, value } }) => {
      state.repSearch[fieldName] = value;
    },
    setSearchFieldData: (state, { payload: { fieldName, value } }) => {
      state.colsearch[fieldName] = value;
    },
    setFormSelectData: (state, { payload: { fieldName, value } }) => {
      state.formData[fieldName] = value;
    },
    setFormData: (state, { payload }) => {
      const ContactName = payload.contact.ContactName;

      state.formData = { ...payload, ContactName };
    },
    setClearFormData: (state) => {
      state.formData = {
        OpportunityDescription: null,
        OpportunityStatus: "Хаагдаагүй",

        EstimatedStartDate: null,
        EstimatedEndDate: null,
        ChancesOfSuccess: null,
        ChallengerEndCompanyDate: null,
      };
      state.dialog = false;
      state.dialogClose = false;
    },
    setData: (state, { payload }) => {
      state.data = payload;
    },
    setReportData: (state, { payload }) => {
      state.repData = payload;
    },
    setReportDataManager: (state, { payload }) => {
      state.repDataManager = payload;
    },
    setReportDataProduct: (state, { payload }) => {
      state.repDataProduct = payload;
    },
    setReportInteractionData: (state, { payload }) => {
      state.repDataInteraction = payload;
    },
    setReportTrainingData: (state, { payload }) => {
      state.repDataTraining = payload;
    },
    setReportTotalInteraction: (state, { payload }) => {
      state.repDataTotalInteraction = payload;
    },
    setReportTotalStatus: (state, { payload }) => {
      state.repDataTotalStatus = payload;
    },
    setReportSummary: (state, { payload }) => {
      state.repDataSummary = payload;
    },
    setDashData: (state, { payload }) => {
      state.repDashData = payload;
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
  setDateSearchData,
  setSelectData,
  setClearFormData,
  setFieldDataSource,
  setFieldLoading,
  setLocalLoading,
  setSearchFieldData,
  setReportData,
  setReportInteractionData,
  setDialogClose,
  setReportDataManager,
  setReportDataProduct,
  setReportTrainingData,
  setReportTotalInteraction,
  setReportTotalStatus,
  setReportSummary,
  setDashData,
} = slice.actions;

export const loadDataSourceRole1 = () => async (dispatch) => {
  var token = helper.getToken();
  try {
    // var today = new Date();

    // let m = today.getMonth() + 1;
    // if (m < 10) {
    //   m = "0" + m;
    // }
    // let m1 = today.getMonth();
    // if (m1 < 10) {
    //   m1 = "0" + m1;
    // }
    // var value = today.getFullYear() + "-" + m + "-" + today.getDate();
    // var value1 = today.getFullYear() + "-" + m1 + "-" + today.getDate();
    // dispatch(
    //   setDateSearchData({ fieldName: "EstimatedEndDate", value: value })
    // );
    // dispatch(
    //   setDateSearchData({ fieldName: "EstimatedStartDate", value: value1 })
    // );
    dispatch(setFieldLoading({ fieldName: "UserID", loading: true }));
    let par = {
      UserName: "",
      EmpFirstName: "",
      EmpLastName: "",
      RoleID: "",
    };

    par = JSON.stringify(par);
    const res = await axios.get(
      process.env.REACT_APP_API_URL + `/select-user`,
      {
        headers: { authorization: "Bearer " + token },
      }
    );

    let reqData = res.data.data.data;

    reqData = reqData.map((s) => ({ value: s.UserID, label: s.EmpFirstName }));
    reqData.push({ value: "", label: "Бүгд" });

    dispatch(setFieldDataSource({ fieldName: "UserID", dataSource: reqData }));
    dispatch(setFieldLoading({ fieldName: "UserID", loading: false }));
  } catch (error) {
    console.log(error);
    dispatch(setLoading(false));
    dispatch(setAlert({ message: "Алдаа гарлаа", success: false }));
  }
};

export const loadUsers = ({ page, rowsPerPage }) => async (
  dispatch,
  getState
) => {
  try {
    var params = getState().opportunity.colsearch;
    params = JSON.stringify(params);
    dispatch(setLocalLoading(true));

    const res = await helper.CallServiceWorker({
      url: "opportunity",
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

    const currentState = getState().opportunity.formData;
    if (currentState.OpportunityID) {
      const res = await helper.UpdateServiceWorker({
        url: "opportunity",
        currentState,
        id: currentState.OpportunityID,
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
        url: "opportunity",
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
export const SaveFormData1 = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));

    const currentState = getState().opportunity.formData;
    if (
      currentState.OpportunityCloseTypeID === 2 &&
      currentState.SuggestReasonID === null
    ) {
      dispatch(setAlert(true));
      dispatch(setAlertStatus(false));

      dispatch(setAlertMessege("Талбар гүйцэд бөглөнө үү!!!"));
    } else {
      if (
        (currentState.OpportunityCloseTypeID === 3 &&
          currentState.ChallengerCompanyID === null) ||
        (currentState.OpportunityCloseTypeID === 3 &&
          currentState.ChallengerEndCompanyDate === null)
      ) {
        dispatch(setAlert(true));
        dispatch(setAlertStatus(false));

        dispatch(setAlertMessege("Талбар гүйцэд бөглөнө үү!!!"));
      } else {
        let newState = {
          OpportunityCloseTypeID: currentState.OpportunityCloseTypeID,
          ChallengerEndCompanyDate: currentState.ChallengerEndCompanyDate,
          ChallengerCompanyID: currentState.ChallengerCompanyID,
          SuggestReasonID: currentState.SuggestReasonID,
        };
        const res = await helper.UpdateServiceWorker({
          url: "opportunity",
          currentState: newState,
          id: currentState.OpportunityID,
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
      url: "opportunity",
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
export const deleteOwner = (id) => async (dispatch) => {
  var token = helper.getToken();
  try {
    dispatch(setLoading(true));

    const res = await helper.DeleteServiceWorker({
      url: "opportunity",
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

export const LoadSingleUser = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));

    const id = getState().opportunity.formData[
      "contact.legal_entity.LegalEntityRegisterNo"
    ];

    const res = await helper.SingleSearchWorker({
      url: "opportunity",
      id,
    });

    if (res.data.success === true) {
      const reqData = res.data.data;

      const fieldName = "ContactName";
      const value = reqData.LegalEntityName;

      const ContactID = reqData.contact[0].ContactID;
      dispatch(setFormFieldData({ fieldName, value }));
      dispatch(setFormFieldData({ fieldName: "ContactName", value }));
      dispatch(setFormFieldData({ fieldName: "ContactID", value: ContactID }));
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
export const loadDataSourceRole = () => async (dispatch) => {
  var token = helper.getToken();
  try {
    dispatch(setFieldLoading({ fieldName: "OpportunityType", loading: true }));
    dispatch(setFieldLoading({ fieldName: "SuggestReasonID", loading: true }));
    dispatch(
      setFieldLoading({ fieldName: "ChallengerCompanyID", loading: true })
    );
    dispatch(
      setFieldLoading({ fieldName: "OpportunityCloseTypeID", loading: true })
    );
    dispatch(
      setFieldLoading({ fieldName: "InteractionTypeID", loading: true })
    );
    const res = await axios.get(
      process.env.REACT_APP_API_URL + `/opportunity-type`,
      {
        headers: { authorization: "Bearer " + token },
      }
    );
    let reqData = res.data.data.data;

    reqData = reqData.map((s) => ({
      value: s.OpportunityTypeID,
      label: s.OppotrunityType,
    }));
    // reqData.push({ value: "", label: "Бүгд" });

    dispatch(
      setFieldDataSource({ fieldName: "OpportunityType", dataSource: reqData })
    );

    const res1 = await axios.get(
      process.env.REACT_APP_API_URL + `/opportunity-close-type`,
      {
        headers: { authorization: "Bearer " + token },
      }
    );
    let reqData1 = res1.data.data.data;

    reqData1 = reqData1.map((s) => ({
      value: s.OpportunityCloseTypeID,
      label: s.Description,
    }));
    // reqData.push({ value: "", label: "Бүгд" });

    dispatch(
      setFieldDataSource({
        fieldName: "OpportunityCloseTypeID",
        dataSource: reqData1,
      })
    );

    const res2 = await axios.get(
      process.env.REACT_APP_API_URL + `/select-interaction`,
      {
        headers: { authorization: "Bearer " + token },
      }
    );
    let reqData2 = res2.data.data.data;

    reqData1 = reqData2.map((s) => ({
      value: s.InteractionTypeID,
      label: s.Description,
    }));
    // reqData.push({ value: "", label: "Бүгд" });

    dispatch(
      setFieldDataSource({
        fieldName: "InteractionTypeID",
        dataSource: reqData1,
      })
    );

    const res3 = await axios.get(
      process.env.REACT_APP_API_URL + `/select-reason`,
      {
        headers: { authorization: "Bearer " + token },
      }
    );
    let reqData3 = res3.data.data.data;

    reqData3 = reqData3.map((s) => ({
      value: s.OpportunityLostReasonID,
      label: s.Description,
    }));
    // reqData.push({ value: "", label: "Бүгд" });

    dispatch(
      setFieldDataSource({
        fieldName: "SuggestReasonID",
        dataSource: reqData3,
      })
    );

    const res4 = await axios.get(
      process.env.REACT_APP_API_URL + `/select-challenger`,
      {
        headers: { authorization: "Bearer " + token },
      }
    );
    let reqData4 = res4.data.data.data;

    reqData4 = reqData4.map((s) => ({
      value: s.ChallengerCompanyID,
      label: s.CompanyName,
    }));
    // reqData.push({ value: "", label: "Бүгд" });

    dispatch(
      setFieldDataSource({
        fieldName: "ChallengerCompanyID",
        dataSource: reqData4,
      })
    );

    dispatch(
      setFieldLoading({ fieldName: "InteractionTypeID", loading: false })
    );
    dispatch(
      setFieldLoading({ fieldName: "OpportunityCloseTypeID", loading: false })
    );
    dispatch(setFieldLoading({ fieldName: "SuggestReasonID", loading: false }));
    dispatch(
      setFieldLoading({ fieldName: "ChallengerCompanyID", loading: false })
    );
    dispatch(setFieldLoading({ fieldName: "OpportunityType", loading: false }));
  } catch (error) {
    console.log(error);
    dispatch(setLoading(false));
    dispatch(setAlert({ message: "Алдаа гарлаа", success: false }));
  }
};

export const LoadSingleUserData = (row) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));

    const id = row.OpportunityID ? row.OpportunityID : null;

    if (id) {
      const res = await helper.SingleServiceWorker({
        url: "opportunity",
        id,
      });

      const reqData = res.data.data.data;

      if (res.data.success === true) {
        const reqData = res.data.data;
        console.log({ reqData });
        dispatch(setFormData(res.data.data));
        dispatch(setDialog(true));
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

export const getReport = ({ page, rowsPerPage }) => async (
  dispatch,
  getState
) => {
  try {
    var params = getState().opportunity.repSearch;
    let tmpID = params.UserID;
    params = JSON.stringify(params);

    let user = helper.getRole();

    // if (user.user.RoleID === 2 || tmpID) {
    dispatch(setLocalLoading(true));
    dispatch(setLoading(true));
    var token = localStorage.getItem("token");

    const res = await axios.get(
      process.env.REACT_APP_API_URL +
        `/opportunity/report?page[number]=${
          page + 1
        }&page[size]=${rowsPerPage}&params=${params}`,
      { headers: { authorization: "Bearer " + token } }
    );
    const reqData = res.data.data.data;

    dispatch(
      setReportData({
        list: reqData,
        count: res.data.data.count,
        tval: res.data.data.tval,
        tfee: res.data.data.tfee,
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

    dispatch(setLoading(false));
    // } else {
    //   dispatch(setAlert(true));
    //   dispatch(setAlertStatus(true));
    //   dispatch(setAlertMessege("Менежер сонгоно уу"));
    // }
  } catch (error) {
    console.log(error);
    dispatch(setLoading(false));
    dispatch(setAlert({ message: "Алдаа гарлаа", success: false }));
  }
};
export const getReportByManager = ({ page, rowsPerPage }) => async (
  dispatch,
  getState
) => {
  try {
    var params = getState().opportunity.repSearch;

    params = JSON.stringify(params);

    let user = helper.getRole();

    dispatch(setLocalLoading(true));
    dispatch(setLoading(true));
    var token = localStorage.getItem("token");

    const res = await axios.get(
      process.env.REACT_APP_API_URL +
        `/opportunity/by-manager?page[number]=${
          page + 1
        }&page[size]=${rowsPerPage}&params=${params}`,
      { headers: { authorization: "Bearer " + token } }
    );
    const reqData = res.data.data.data;

    dispatch(
      setReportDataManager({
        list: reqData,
        count: res.data.data.count,
        tval: res.data.data.val,
        tfee: res.data.data.total,
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
    dispatch(setLoading(false));
  } catch (error) {
    console.log(error);
    dispatch(setLoading(false));
    dispatch(setAlert({ message: "Алдаа гарлаа", success: false }));
  }
};
export const getReportByProduct = ({ page, rowsPerPage }) => async (
  dispatch,
  getState
) => {
  try {
    var params = getState().opportunity.repSearch;

    params = JSON.stringify(params);

    let user = helper.getRole();

    dispatch(setLocalLoading(true));
    dispatch(setLoading(true));
    var token = localStorage.getItem("token");

    const res = await axios.get(
      process.env.REACT_APP_API_URL +
        `/opportunity/by-product?page[number]=${
          page + 1
        }&page[size]=${rowsPerPage}&params=${params}`,
      { headers: { authorization: "Bearer " + token } }
    );
    const reqData = res.data.data.data;

    dispatch(
      setReportDataProduct({
        list: reqData,
        count: res.data.data.count,
        tval: res.data.data.tval,
        tfee: res.data.data.tfee,
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
    dispatch(setLoading(false));
  } catch (error) {
    console.log(error);
    dispatch(setLoading(false));
    dispatch(setAlert({ message: "Алдаа гарлаа", success: false }));
  }
};
export const getReportInteraction = ({ page, rowsPerPage }) => async (
  dispatch,
  getState
) => {
  try {
    var params = getState().opportunity.repSearch;
    let tmpID = params.UserID;
    params = JSON.stringify(params);

    let user = helper.getRole();

    // if (user.user.RoleID === 2 || tmpID) {
    dispatch(setLocalLoading(true));
    dispatch(setLoading(true));

    var token = localStorage.getItem("token");

    const res = await axios.get(
      process.env.REACT_APP_API_URL +
        `/opportunity/rep-interaction?page[number]=${
          page + 1
        }&page[size]=${rowsPerPage}&params=${params}`,
      { headers: { authorization: "Bearer " + token } }
    );
    const reqData = res.data.data.data;

    dispatch(
      setReportInteractionData({
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

    dispatch(setLoading(false));
    // } else {
    //   dispatch(setAlert(true));
    //   dispatch(setAlertStatus(true));
    //   dispatch(setAlertMessege("Менежер сонгоно уу"));
    // }
  } catch (error) {
    console.log(error);
    dispatch(setLoading(false));
    dispatch(setAlert({ message: "Алдаа гарлаа", success: false }));
  }
};
export const getReportTraining = ({ page, rowsPerPage }) => async (
  dispatch,
  getState
) => {
  try {
    var params = getState().opportunity.repSearch;
    let tmpID = params.UserID;
    params = JSON.stringify(params);

    let user = helper.getRole();

    // if (user.user.RoleID === 2 || tmpID) {
    dispatch(setLocalLoading(true));
    dispatch(setLoading(true));

    var token = localStorage.getItem("token");

    const res = await axios.get(
      process.env.REACT_APP_API_URL +
        `/opportunity/training-report?page[number]=${
          page + 1
        }&page[size]=${rowsPerPage}&params=${params}`,
      { headers: { authorization: "Bearer " + token } }
    );
    const reqData = res.data.data.data;

    dispatch(
      setReportTrainingData({
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

    dispatch(setLoading(false));
    // } else {
    //   dispatch(setAlert(true));
    //   dispatch(setAlertStatus(true));
    //   dispatch(setAlertMessege("Менежер сонгоно уу"));
    // }
  } catch (error) {
    console.log(error);
    dispatch(setLoading(false));
    dispatch(setAlert({ message: "Алдаа гарлаа", success: false }));
  }
};
export const getReportTotalInteraction = ({ page, rowsPerPage }) => async (
  dispatch,
  getState
) => {
  try {
    var params = getState().opportunity.repSearch;
    let tmpID = params.UserID;
    params = JSON.stringify(params);

    let user = helper.getRole();

    // if (user.user.RoleID === 2 || tmpID) {
    dispatch(setLocalLoading(true));
    dispatch(setLoading(true));

    var token = localStorage.getItem("token");

    const res = await axios.get(
      process.env.REACT_APP_API_URL +
        `/opportunity/total-interaction?page[number]=${
          page + 1
        }&page[size]=${rowsPerPage}&params=${params}`,
      { headers: { authorization: "Bearer " + token } }
    );
    const reqData = res.data.data.data;

    dispatch(
      setReportTotalInteraction({
        list: reqData,
        count: res.data.data.count,
        it: res.data.data.it,
        ot: res.data.data.ot,
        newOt: res.data.data.newOt,
        contactCount: res.data.data.contactCount,
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

    dispatch(setLoading(false));
    // } else {
    //   dispatch(setAlert(true));
    //   dispatch(setAlertStatus(true));
    //   dispatch(setAlertMessege("Менежер сонгоно уу"));
    // }
  } catch (error) {
    console.log(error);
    dispatch(setLoading(false));
    dispatch(setAlert({ message: "Алдаа гарлаа", success: false }));
  }
};
export const getReportTotalStatus = ({ page, rowsPerPage }) => async (
  dispatch,
  getState
) => {
  try {
    var params = getState().opportunity.repSearch;

    params = JSON.stringify(params);

    dispatch(setLocalLoading(true));
    dispatch(setLoading(true));

    var token = localStorage.getItem("token");

    const res = await axios.get(
      process.env.REACT_APP_API_URL +
        `/opportunity/total-status?page[number]=${
          page + 1
        }&page[size]=${rowsPerPage}&params=${params}`,
      { headers: { authorization: "Bearer " + token } }
    );
    const reqData = res.data.data.data;

    dispatch(
      setReportTotalStatus({
        list: reqData,
        count: res.data.data.count,
        it: res.data.data.it,
        ot: res.data.data.ot,
        newOt: res.data.data.newOt,
        contactCount: res.data.data.contactCount,
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

    dispatch(setLoading(false));
    // } else {
    //   dispatch(setAlert(true));
    //   dispatch(setAlertStatus(true));
    //   dispatch(setAlertMessege("Менежер сонгоно уу"));
    // }
  } catch (error) {
    console.log(error);
    dispatch(setLoading(false));
    dispatch(setAlert({ message: "Алдаа гарлаа", success: false }));
  }
};
export const getReportSummary = ({ page, rowsPerPage }) => async (
  dispatch,
  getState
) => {
  try {
    var params = getState().opportunity.repSearch;

    params = JSON.stringify(params);

    dispatch(setLocalLoading(true));
    dispatch(setLoading(true));

    var token = localStorage.getItem("token");

    const res = await axios.get(
      process.env.REACT_APP_API_URL +
        `/opportunity/performance-summary?page[number]=${
          page + 1
        }&page[size]=${rowsPerPage}&params=${params}`,
      { headers: { authorization: "Bearer " + token } }
    );
    const reqData = res.data.data.data;

    dispatch(
      setReportSummary({
        list: reqData,
        count: res.data.data.count,
        a1: res.data.data.a1,
        a2: res.data.data.a2,
        a3: res.data.data.a3,
        a4: res.data.data.a4,
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
    dispatch(setLoading(false));
  } catch (error) {
    console.log(error);
    dispatch(setLoading(false));
    dispatch(setAlert({ message: "Алдаа гарлаа", success: false }));
  }
};

export const getDash = ({ page, rowsPerPage }) => async (
  dispatch,
  getState
) => {
  try {
    var params = getState().opportunity.repSearch;

    params = JSON.stringify(params);

    dispatch(setLocalLoading(true));
    dispatch(setLoading(true));

    var token = localStorage.getItem("token");

    const res = await axios.get(
      process.env.REACT_APP_API_URL +
        `/opportunity/dash-data?page[number]=${
          page + 1
        }&page[size]=${rowsPerPage}&params=${params}`,
      { headers: { authorization: "Bearer " + token } }
    );
    const reqData = res.data.data.data;

    dispatch(
      setDashData({
        list: reqData,
        count: res.data.data.count,
        ds: res.data.data.ds,
        ser: res.data.data.ser,
        series1: res.data.data.series1,
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
    dispatch(setLoading(false));
  } catch (error) {
    console.log(error);
    dispatch(setLoading(false));
    dispatch(setAlert({ message: "Алдаа гарлаа", success: false }));
  }
};
export default slice.reducer;
