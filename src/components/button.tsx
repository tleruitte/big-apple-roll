import "./button.css";

import clsx from "clsx";
import { Link } from "gatsby";
import React from "react";

type Props = {
  theme?: "orange" | "blue" | "green";
  label: string;
  to: string;
};

export default function Button(props: Props): React.JSX.Element {
  const { theme = "orange", label, to } = props;

  return (
    <Link className={clsx("button", `button--${theme}Theme`)} to={to}>
      <div className="button-content">{label}</div>
    </Link>
  );
}
