// import React from "react";

// import Snackbar from "@material-ui/core/Snackbar";
// import MuiAlert from "@material-ui/lab/Alert";
// import { makeStyles } from "@material-ui/core/styles";

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//     "& > * + *": {
//       marginTop: theme.spacing(2),
//     },
//   },
// }));

// export default function BaseSnackbar() {
//   const classes = useStyles();
//   const alert = useSelector((state) => state.system.alert);
//   const alertStatus = useSelector((state) => state.system.alertStatus);
//   const alertMessege = useSelector((state) => state.system.alertMessege);

//   const dispatch = useDispatch();

//   const handleClose = () => {
//     dispatch(setAlert(false));
//   };

//   return (
//     <div className={classes.root}>
//       <Snackbar open={alert} autoHideDuration={6000} onClose={handleClose}>
//         {alertStatus ? (
//           <Alert onClose={handleClose} severity="success">
//             {alertMessege}
//           </Alert>
//         ) : (
//           <Alert onClose={handleClose} severity="error">
//             {alertMessege}
//           </Alert>
//         )}
//       </Snackbar>
//     </div>
//   );
// }

// import React, { useEffect } from "react";
// import { Button, message } from "antd";

// import { useSelector, useDispatch } from "react-redux";
// import { setAlert } from "../../redux/reducers/system";
// const BaseSnackbar = () => {
//   const alert = useSelector((state) => state.system.alert);
//   const alertStatus = useSelector((state) => state.system.alertStatus);
//   const alertMessege = useSelector((state) => state.system.alertMessege);

//   const dispatch = useDispatch();

//   const handleClose = () => {
//     dispatch(setAlert(false));
//   };
//   useEffect(() => {
//     openMessage();
//   }, [alert, alertStatus, alertMessege]);
//   const [messageApi, contextHolder] = message.useMessage();
//   const key = "updatable";
//   const openMessage = () => {
//     messageApi.open({
//       key,
//       type: "loading",
//       content: "Loading...",
//     });
//     setTimeout(() => {
//       messageApi.open({
//         key,
//         type: alertStatus,
//         content: alertMessege,
//         duration: 2,
//       });
//     }, 1000);
//   };
//   return (
//     <>
//       {alertMessege ? contextHolder : null}
//       {/* <Button type="primary" onClick={openMessage}>
//         Open the message box
//       </Button> */}
//     </>
//   );
// };
// export default BaseSnackbar;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAlert } from "../../redux/reducers/system";
import { Button, message, Space } from "antd";
const BaseSnackbar = () => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const alert = useSelector((state) => state.system.alert);
  const alertStatus = useSelector((state) => state.system.alertStatus);
  const alertMessege = useSelector((state) => state.system.alertMessege);
  useEffect(() => {
    success();
  }, [alert]);

  const handleClose = () => {
    dispatch(setAlert(false));
  };
  const success = () => {
    messageApi.open({
      type: alertStatus ? "success" : "error",
      content: alertMessege,
    });
  };
  // const error = () => {
  //   messageApi.open({
  //     type: "error",
  //     content: "This is an error message",
  //   });
  // };
  // const warning = () => {
  //   messageApi.open({
  //     type: "warning",
  //     content: "This is a warning message",
  //   });
  // };
  setTimeout(() => {
    handleClose();
  }, 2000);
  return (
    <>
      {alert && contextHolder}
      {/* <Space>
        <Button onClick={success}>Success</Button>
        <Button onClick={error}>Error</Button>
        <Button onClick={warning}>Warning</Button>
      </Space> */}
    </>
  );
};
export default BaseSnackbar;
