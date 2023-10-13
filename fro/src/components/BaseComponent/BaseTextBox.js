import React, { useEffect, useState } from "react";
import { TextField, IconButton, InputAdornment } from "@material-ui/core";
import { useSelector } from "react-redux";

import helper from "../../helper/helper";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
}));

export default ({ valueSelector, fieldName, onChange, label, ...props }) => {
  const value = useSelector((state) => helper.getValue(state, valueSelector));
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      {value ? (
        <TextField
          value={value}
          label={props.disabled ? " " : label}
          disabled={props.disabled}
          onChange={(e) => onChange && onChange(fieldName, e.target.value)}
          variant={props.variant ? props.variant : "outlined"}
          size="small"
          style={{
            minWidth: props.minWidth ? props.minWidth : "500px",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconButton>{props.icon ? props.icon : null}</IconButton>
              </InputAdornment>
            ),
          }}
        />
      ) : (
        <TextField
          value={""}
          label={props.disabled ? " " : label}
          disabled={props.disabled}
          onChange={(e) => onChange && onChange(fieldName, e.target.value)}
          variant={props.variant ? props.variant : "outlined"}
          size="small"
          style={{
            minWidth: props.minWidth ? props.minWidth : "500px",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconButton>{props.icon ? props.icon : null}</IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    </form>
  );
};
