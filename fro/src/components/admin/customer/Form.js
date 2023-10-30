import React, { useEffect } from "react";
// @material-ui/core components
// import { makeStyles } from "@material-ui/core/styles";
//custom
import { useDispatch } from "react-redux";
import { setFormFieldData, loadDataSourceRole } from "redux/reducers/users";
// import { BaseField } from "../../BaseComponents";
import { BaseField } from "components/BaseComponent";
//icons
const UserForm = (props) => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(loadDataSourceRole());
  // }, []);

  const getFieldProps = (fieldName) => {
    return {
      valueSelector: `users.formData.${fieldName}`,
      dataSourceSelector: `users.fieldConfig.${fieldName}.dataSources`,
      configSelector: `users.fieldConfig.${fieldName}`,
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
      <BaseField label="Хүйс" {...getFieldProps("sex")} />
      <BaseField label="Утас" {...getFieldProps("phone")} />
      <BaseField label="Цахим шуудан" {...getFieldProps("email")} />
      <BaseField label="Түвшин" {...getFieldProps("level")} />
      <BaseField label="Нууц үг" {...getFieldProps("password")} />
      <BaseField label="Нэвтрэх нэр" {...getFieldProps("username")} />
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
