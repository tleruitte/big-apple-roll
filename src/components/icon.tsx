import React from "react";

import * as style from "src/components/icon.module.css";

// All icons: https://fonts.google.com/icons?query=Material+Symbols
export enum IconName {
  Close = "close",
  Menu = "menu",
}

type Props = {
  name: IconName;
};

export default function Icon(props: Props): React.JSX.Element | null {
  const { name } = props;

  return <span className={style.icon}>{name}</span>;
}
