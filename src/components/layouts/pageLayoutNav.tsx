import clsx from "clsx";
import React from "react";

import * as style from "src/components/layouts/pageLayoutNav.module.css";
import Link from "src/components/link";

type Props = {
  mobile?: boolean;
  onClick?: React.MouseEventHandler;
};

export default function PageLayoutNav(props: Props): React.JSX.Element | null {
  const { mobile, onClick } = props;

  return (
    <nav
      className={clsx(style.nav, {
        [style.isMobile]: mobile,
      })}
    >
      <Link className={style.navItem} to="/schedule/" onClick={onClick}>
        Schedule
      </Link>
      <Link className={style.navItem} to="/hotel/" onClick={onClick}>
        Hotel
      </Link>
      <Link className={style.navItem} to="/sponsors/" onClick={onClick}>
        Sponsors
      </Link>
      <Link className={style.navItem} to="/shop/" onClick={onClick}>
        Shop
      </Link>
    </nav>
  );
}
