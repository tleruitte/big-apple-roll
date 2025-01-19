import React from "react";
import { GatsbyBrowser } from "gatsby";
import { Provider } from "react-redux";

import PageLayout from "./src/components/layouts/pageLayout";

import store from "src/app/store";

import "./src/components/style/variables/color.css";
import "./src/components/style/variables/font.css";
import "./src/components/style/variables/media.css";
import "./src/components/style/variables/spacing.css";
import "./src/components/style/global.css";

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = (args) => {
  const { element, props } = args;

  return <PageLayout {...props}>{element}</PageLayout>;
};

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = (args) => {
  const { element } = args;

  return <Provider store={store}> {element}</Provider>;
};
