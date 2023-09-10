import axios from "axios";

const BaseApiUrl =
  process.env.NODE_ENV === "development"
    ? `${process.env.REACT_APP_API}/`
    : `${process.env.REACT_APP_API}/`;

const BaseFileUrl =
  process.env.NODE_ENV === "development"
    ? `${process.env.REACT_APP_API_BASE}/`
    : `${process.env.REACT_APP_API_BASE}/`;

const server = axios.create({ baseURL: BaseApiUrl });

const GetToken = function () {
  return localStorage.getItem("ITSToken");
};

export default {
  server: server,
  BaseApiUrl: BaseApiUrl,
  BaseFileUrl: BaseFileUrl,

  CallService: async function ({ Url, Data, Method, ResponseType }) {
    try {
      var Token = GetToken();
      process.env.NODE_ENV === "development" &&
        console.log({ Url, Data, Method });
      var res = await server({
        method: Method ? Method : "POST",
        headers: { authorization: "Bearer " + Token },
        url: Url,
        data: Data,
        responseType: ResponseType ? ResponseType : "json",
      });
      process.env.NODE_ENV === "development" && console.log({ res });
      return res;
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        window.location.reload(false);
      }
      return {
        data: {
          Success: false,
          Data: null,
          Total: 0,
          Message: "",
        },
        status: ex.response ? ex.response.status : 0,
      };
    }
  },

  BaseGetList: async function ({ ObjectName, ReqData, CustomUrl }) {
    try {
      var Token = GetToken();
      process.env.NODE_ENV === "development" &&
        console.log({ ObjectName, ReqData });

      var res = await server({
        method: "GET",
        headers: { authorization: "Bearer" + Token },
        url: CustomUrl ? CustomUrl : "base/" + ObjectName + ReqData,
      });
      process.env.NODE_ENV === "development" && console.log({ res });
      return res;
    } catch (ex) {
      process.env.NODE_ENV === "development" && console.log(ex);
      var status = ex.response ? ex.response.status : 0;
      process.env.NODE_ENV === "development" && console.log({ status });
      if (status === 401) {
        return {
          data: {
            Success: false,
            Data: [],
            Total: 0,
            Message: "Системд нэвтрээгүй байна !!! ",
          },
        };
      }
      return {
        data: {
          Success: false,
          Data: [],
          Total: 0,
          Message: "Алдаа гарлаа",
        },
      };
    }
  },

  BaseGetDetail: async function ({ ObjectName, Id, CustomUrl }) {
    try {
      process.env.NODE_ENV === "development" && console.log({ ObjectName, Id });
      var Token = GetToken();
      var res = await server({
        method: "GET",
        headers: { authorization: "Bearer " + Token },
        url: CustomUrl ? CustomUrl : "base/" + ObjectName + "/" + Id,
      });
      process.env.NODE_ENV === "development" && console.log({ res });
      return res;
    } catch (ex) {
      return {
        data: {
          Success: false,
          Data: null,
          Total: 0,
          Message: "",
        },
        status: ex.response ? ex.response.status : 0,
      };
    }
  },

  BaseGetDetailAdvance: async function ({ ObjectName, ReqData, CustomUrl }) {
    try {
      process.env.NODE_ENV === "development" &&
        console.log({ ObjectName, ReqData });
      var Token = GetToken();
      var res = await server({
        method: "GET",
        headers: { authorization: "Bearer " + Token },
        url: CustomUrl
          ? CustomUrl
          : "base/" + ObjectName + "/get-detail" + ReqData,
      });
      process.env.NODE_ENV === "development" && console.log({ res });
      return res;
    } catch (ex) {
      return {
        data: {
          Success: false,
          Data: null,
          Total: 0,
          Message: "",
        },
        status: ex.response ? ex.response.status : 0,
      };
    }
  },

  BaseCreate: async function ({ ObjectName, Data, CustomUrl }) {
    try {
      process.env.NODE_ENV === "development" &&
        console.log({ ObjectName, Data });
      var Token = GetToken();
      var res = await server({
        method: "POST",
        url: CustomUrl ? CustomUrl : "base/" + ObjectName,
        headers: { authorization: "Bearer " + Token },
        data: { Data: JSON.stringify(Data) },
      });
      process.env.NODE_ENV === "development" && console.log({ res });
      return res;
    } catch (ex) {
      return {
        data: {
          Success: false,
          Data: null,
          Total: 0,
          Message: "",
        },
        status: ex.response ? ex.response.status : 0,
      };
    }
  },

  BaseUpdate: async function ({ ObjectName, Data, Id, CustomUrl }) {
    try {
      process.env.NODE_ENV === "development" &&
        console.log({ ObjectName, Data, Id });
      var Token = GetToken();
      var res = await server({
        method: "PUT",
        url: CustomUrl ? CustomUrl : "base/" + ObjectName + "/" + Id,
        headers: { authorization: "Bearer " + Token },
        data: { Data: JSON.stringify(Data) },
      });
      process.env.NODE_ENV === "development" && console.log({ res });
      return res;
    } catch (ex) {
      return {
        data: {
          Success: false,
          Data: null,
          Total: 0,
          Message: "",
        },
        status: ex.response ? ex.response.status : 0,
      };
    }
  },

  BaseDelete: async function ({ ObjectName, Id, CustomUrl }) {
    try {
      process.env.NODE_ENV === "development" && console.log({ ObjectName, Id });
      var Token = GetToken();
      var res = await server({
        method: "DELETE",
        url: CustomUrl ? CustomUrl : "base/" + ObjectName + "/" + Id,
        headers: { authorization: "Bearer " + Token },
        Data: { Id },
      });
      process.env.NODE_ENV === "development" && console.log({ res });
      return res;
    } catch (ex) {
      return {
        data: {
          Success: false,
          Data: null,
          Total: 0,
          Message: "",
        },
        status: ex.response ? ex.response.status : 0,
      };
    }
  },

  BaseDownloadFile: async function ({ FileInfo, CustomUrl }) {
    process.env.NODE_ENV === "development" && console.log({ FileInfo });
    var Token = GetToken();
    var ResponseData = await server({
      method: "GET",
      url: CustomUrl
        ? CustomUrl
        : "base/download-file?FileInfo=" + JSON.stringify(FileInfo),
      headers: { authorization: "Bearer " + Token },
      responseType: "blob",
    });
    var Data = ResponseData.data;
    if (Data.Success === false) {
      return Data;
    } else {
      if (FileInfo.OrginalName.indexOf(".pdf") > -1) {
        const file = new Blob([Data], { type: "application/pdf" });
        var s = window.URL.createObjectURL(file);
        return s;
      } else {
        const url = window.URL.createObjectURL(new Blob([Data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", FileInfo.OrginalName);
        document.body.appendChild(link);
        link.click();
        return null;
      }

      // window.open(s);
    }
  },

  BaseUploadFile: async function ({
    Value,
    LinkedObjectInfo,
    ShowProgress,
    CustomUrl,
  }) {
    var formData = new FormData();
    process.env.NODE_ENV === "development" && console.log({ Value });
    formData.append("LinkedObjectInfo", JSON.stringify(LinkedObjectInfo));
    for (var l = 0; l < Value.length; l++) {
      if (Value[l].File) {
        formData.append(
          "File" + l,
          Value[l].File,
          Value[l].FileInfo.OrginalName
        );
      }
      formData.append("File" + l + "Info", JSON.stringify(Value[l].FileInfo));
    }
    const Token = GetToken();
    const ResponseData = await server({
      method: "POST",
      url: CustomUrl ? CustomUrl : "base/file-upload",
      headers: { authorization: "Bearer " + Token },
      data: formData,
      onUploadProgress: (e) => {
        process.env.NODE_ENV === "development" && console.log(e);
      }, //ShowProgress ? ShowProgress : undefined,
    });
    const Data = ResponseData.data;
    return Data;
  },
};
