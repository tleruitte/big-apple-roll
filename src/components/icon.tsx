import React from "react";

import * as style from "src/components/icon.module.css";
import Instagram from "src/components/images/Instagram.svg";
import assertNever from "src/helpers/assertNever";

// All icons: https://fonts.google.com/icons?query=Material+Symbols
export enum IconName {
  Close = "close",
  Instagram = "instagram",
  Menu = "menu",
}

type Props = {
  name: IconName;
};

export default function Icon(props: Props): React.JSX.Element | null {
  const { name } = props;

  switch (name) {
    case IconName.Close:
    case IconName.Menu: {
      return <span className={style.icon}>{name}</span>;
    }
    case IconName.Instagram: {
      return <img src={Instagram} width="20" height="20" />;
    }
    default: {
      assertNever(name);
      return null;
    }
  }
}
