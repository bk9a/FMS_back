import React from "react";
import BaseTextBox from "./BaseTextBox";
// import BaseSelectBox from "./BaseSelectBox";
// import BaseCheckBox from "./BaseCheckBox";
// import BaseTextPercent from "./BaseTextPercent";
// import BasePassword from "./BasePassword";
// import BaseTextSearch from "./BaseTextSearch";
// import BaseSelectSearch from "./BaseSelectSearch";
// import BaseCheckSearch from "./BaseCheckSearch";
// import BaseDate from "./BaseDate";
// import BaseSelectBoxV1 from "./BaseSelectBoxV1";
// import BaseRegSearch from "./BaseRegSearch";
// import BaseEmail from "./BaseEmail";
// import BaseAuto from "./BaseAuto";
// import BaseTextNumber from "./BaseTextNumber";
// import BaseSelectSearchv1 from "./BaseSelectSearchv1";
// import AutoSelect from "./AutoSelect";
export default ({
  type,
  valueSelector,
  dataSource,
  dataSourceSelector,
  fieldName,
  configSelector,
  onChange,
  label,
  ...props
}) => {
//   if (type == "textBox") {
//     return (
//       <BaseTextBox
//         {...{
//           type,
//           valueSelector,
//           fieldName,
//           onChange,
//           label,
//           ...props,
//         }}
//       />
//     );
//   }
//   if (type == "selectBox") {
//     return (
//       <BaseAuto
//         {...{
//           type,
//           valueSelector,
//           dataSource,
//           dataSourceSelector,
//           configSelector,
//           fieldName,
//           onChange,
//           label,
//           ...props,
//         }}
//       />
//     );
//   }
//   if (type == "selectBoxV2") {
//     return (
//       <BaseSelectBox
//         {...{
//           type,
//           valueSelector,
//           dataSource,
//           dataSourceSelector,
//           configSelector,
//           fieldName,
//           onChange,
//           label,
//           ...props,
//         }}
//       />
//     );
//   }
//   if (type == "selectV1") {
//     return (
//       <BaseSelectBoxV1
//         {...{
//           type,
//           valueSelector,
//           dataSource,
//           dataSourceSelector,
//           configSelector,
//           fieldName,
//           onChange,
//           label,
//           ...props,
//         }}
//       />
//     );
//   }
//   if (type == "checkBox") {
//     return (
//       <BaseCheckBox
//         {...{
//           type,
//           valueSelector,
//           dataSource,
//           dataSourceSelector,
//           configSelector,
//           fieldName,
//           onChange,
//           label,
//           ...props,
//         }}
//       />
//     );
//   }
//   if (type == "percent") {
//     return (
//       <BaseTextPercent
//         {...{
//           type,
//           valueSelector,
//           dataSource,
//           dataSourceSelector,
//           configSelector,
//           fieldName,
//           onChange,
//           label,
//           ...props,
//         }}
//       />
//     );
//   }

//   if (type == "password") {
//     return (
//       <BasePassword
//         {...{
//           type,
//           valueSelector,
//           dataSource,
//           dataSourceSelector,
//           configSelector,
//           fieldName,
//           onChange,
//           label,
//           ...props,
//         }}
//       />
//     );
//   }

//   if (type == "search") {
//     return (
//       <BaseTextSearch
//         {...{
//           type,
//           valueSelector,
//           dataSource,
//           dataSourceSelector,
//           configSelector,
//           fieldName,
//           onChange,
//           label,
//           ...props,
//         }}
//       />
//     );
//   }

//   if (type == "selectsearch") {
//     return (
//       <BaseSelectSearch
//         {...{
//           type,
//           valueSelector,
//           dataSource,
//           dataSourceSelector,
//           configSelector,
//           fieldName,
//           onChange,
//           label,
//           ...props,
//         }}
//       />
//     );
//   }
//   if (type == "selectsearchV1") {
//     return (
//       <BaseSelectSearchv1
//         {...{
//           type,
//           valueSelector,
//           dataSource,
//           dataSourceSelector,
//           configSelector,
//           fieldName,
//           onChange,
//           label,
//           ...props,
//         }}
//       />
//     );
//   }
//   if (type == "checksearch") {
//     return (
//       <BaseCheckSearch
//         {...{
//           type,
//           valueSelector,
//           dataSource,
//           dataSourceSelector,
//           configSelector,
//           fieldName,
//           onChange,
//           label,
//           ...props,
//         }}
//       />
//     );
//   }
//   if (type == "date") {
//     return (
//       <BaseDate
//         {...{
//           type,
//           valueSelector,
//           dataSource,
//           dataSourceSelector,
//           configSelector,
//           fieldName,
//           onChange,
//           label,
//           ...props,
//         }}
//       />
//     );
//   }

//   if (type == "regsearch") {
//     return (
//       <BaseRegSearch
//         {...{
//           type,
//           valueSelector,
//           dataSource,
//           dataSourceSelector,
//           configSelector,
//           fieldName,
//           onChange,
//           label,
//           ...props,
//         }}
//       />
//     );
//   }

//   if (type == "email") {
//     return (
//       <BaseEmail
//         {...{
//           type,
//           valueSelector,
//           dataSource,
//           dataSourceSelector,
//           configSelector,
//           fieldName,
//           onChange,
//           label,
//           ...props,
//         }}
//       />
//     );
//   }
//   if (type == "autocomplete") {
//     return (
//       <BaseAuto
//         {...{
//           type,
//           valueSelector,
//           dataSource,
//           dataSourceSelector,
//           configSelector,
//           fieldName,
//           onChange,
//           label,
//           ...props,
//         }}
//       />
//     );
//   }

//   if (type == "number") {
//     return (
//       <BaseTextNumber
//         {...{
//           type,
//           valueSelector,
//           dataSource,
//           dataSourceSelector,
//           configSelector,
//           fieldName,
//           onChange,
//           label,
//           ...props,
//         }}
//       />
//     );
//   }
//   if (type == "multiauto") {
//     return (
//       <AutoSelect
//         {...{
//           type,
//           valueSelector,
//           dataSource,
//           dataSourceSelector,
//           configSelector,
//           fieldName,
//           onChange,
//           label,
//           ...props,
//         }}
//       />
//     );
//   }

  return (
    <BaseTextBox
      {...{
        type,
        valueSelector,
        fieldName,
        onChange,
        label,
        ...props,
      }}
    />
  );
};
