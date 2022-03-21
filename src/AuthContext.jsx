import React from "react";

const AuthContext = React.createContext({
  check: () => {},
  won: false,
  draggable: false,
});

export default AuthContext;
