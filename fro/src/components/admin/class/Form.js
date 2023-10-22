import React, { useEffect } from "react";
// @material-ui/core components
// import { makeStyles } from "@material-ui/core/styles";
//custom
import { useDispatch } from "react-redux";
import {
  setFormFieldData,
  // loadDataSourceRole,
} from "redux/reducers/_classinfo";
// import { BaseField } from "../../BaseComponents";
import { BaseField } from "components/BaseComponent";
//icons
const UserForm = (props) => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(loadDataSourceRole());
  // }, []);

  console.log("render form");

  const getFieldProps = (fieldName) => {
    return {
      valueSelector: `classinfo.formData.${fieldName}`,
      dataSourceSelector: `classinfo.fieldConfig.${fieldName}.dataSources`,
      configSelector: `classinfo.fieldConfig.${fieldName}`,
      fieldName: fieldName,
      onChange: (fieldName, value) => {
        dispatch(setFormFieldData({ fieldName, value }));
        // if (fieldName == "Description") {
        //   changeDescripotion();
        // }
      },
    };
  };
  return (
    <div>
      <BaseField label="Нэр" {...getFieldProps("firstname")} />
      <BaseField label="Овог" {...getFieldProps("lastname")} />
      <BaseField label="Утас" {...getFieldProps("phone")} />
      <BaseField label="Цахим шуудан" {...getFieldProps("email")} />
      {/* <BaseField
        label="Хэрэглэгчийн эрх"
        type="selectBox"
        {...getFieldProps("RoleID")}
      />
      <BaseField
        label="Идэвхтэй эсэх"
        type="checkBox"
        {...getFieldProps("IsActive")}
      /> */}
    </div>
  );
};
export default UserForm;
