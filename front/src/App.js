import React from "react";

import { AuthProvider, useAuth } from "./admin/context/auth";

import Authenticated from "./Authenticated.js";
import NotAuthenticated from "./NotAuthenticated.js";

function App1() {
  const { UserData } = useAuth();
  // хэрэглэгчийн нэвтэрсэн байгаа эсэхийг шалгаж байна.
  if (UserData) {
    // хэрэв нэвтэрсэн байвал
    return <Authenticated />;
  } else {
    // хэрэв нэвтэргүй байвал
    return <NotAuthenticated />;
  }
}

const App = () => {
  return (
    <AuthProvider>
      <App1 />
    </AuthProvider>
  );
};

export default App;
