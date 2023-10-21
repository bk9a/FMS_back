import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { useSelector } from "react-redux";

import helper from "../../helper/helper";

export default ({ valueSelector, fieldName, onChange, label, ...props }) => {
  const value = useSelector((state) => helper.getValue(state, valueSelector));
  // const classes = useStyles();

  return (
    <Input
      placeholder={label}
      value={value}
      onChange={(e) => onChange && onChange(fieldName, e.target.value)}
    />
    // <form className={classes.root} noValidate autoComplete="off">
    //   {value ? (
    //     <TextField
    //       value={value}
    //       label={props.disabled ? " " : label}
    //       disabled={props.disabled}
    //       onChange={(e) => onChange && onChange(fieldName, e.target.value)}
    //       variant={props.variant ? props.variant : "outlined"}
    //       size="small"
    //       style={{
    //         minWidth: props.minWidth ? props.minWidth : "500px",
    //       }}
    //       InputProps={{
    //         endAdornment: (
    //           <InputAdornment position="start">
    //             <IconButton>{props.icon ? props.icon : null}</IconButton>
    //           </InputAdornment>
    //         ),
    //       }}
    //     />
    //   ) : (
    //     <TextField
    //       value={""}
    //       label={props.disabled ? " " : label}
    //       disabled={props.disabled}
    //       onChange={(e) => onChange && onChange(fieldName, e.target.value)}
    //       variant={props.variant ? props.variant : "outlined"}
    //       size="small"
    //       style={{
    //         minWidth: props.minWidth ? props.minWidth : "500px",
    //       }}
    //       InputProps={{
    //         endAdornment: (
    //           <InputAdornment position="start">
    //             <IconButton>{props.icon ? props.icon : null}</IconButton>
    //           </InputAdornment>
    //         ),
    //       }}
    //     />
    //   )}
    // </form>
  );
};
