import clsx from "clsx";
import { Link } from "gatsby";
import React from "react";

import * as style from "src/components/button.module.css";
import switchOn from "src/helpers/switchOn";

type Props = {
  color?: "orange" | "blue" | "green";
  size?: "large";
  banner?: string;
  label: string;
  to: string;
};

export default function Button(props: Props): React.JSX.Element {
  const { color: color = "orange", size, banner, label, to } = props;

  return (
    <Link
      className={clsx(
        style.button,
        switchOn(color, {
          orange: style.buttonOrangeColor,
          blue: style.buttonBlueColor,
          green: style.buttonGreenColor,
        }),
        { [style.buttonLarge]: size === "large" },
      )}
      to={to}
    >
      {banner ? <div className={style.buttonBanner}>{banner}</div> : null}
      <div className={style.buttonContent}>{label}</div>
    </Link>
  );
}
