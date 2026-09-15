import React from "react";
import MDXComponents from "@theme-original/MDXComponents";

export default {
  ...MDXComponents,
  table: (props) => <table {...props} tabIndex={0} />,
};
