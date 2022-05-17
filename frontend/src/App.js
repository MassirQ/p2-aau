import React, { useEffect } from "react";
import { Route } from "react-router-dom";

import Form from "./pages/form";
import { HomePage } from "./pages/home";

function App() {
  return (
    <>
    <Route path="/"  exact component={HomePage}/>
    <Route path="/form" exact component={Form}/>
</>
  );
}

export default App;
