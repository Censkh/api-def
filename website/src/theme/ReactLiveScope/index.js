import * as apiDef from "api-def";
import React from "react";
import { useAsyncState } from "react-async-stateful";

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  useAsyncState,
  ...apiDef,
};

export default ReactLiveScope;
