import React from "react";

import * as style from "src/components/buttons/textButton.module.css";
import Link from "src/components/link";

type Props = {
  to?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

export default function TextButton(props: Props): React.JSX.Element {
  const { to, onClick, children } = props;

  return (
    <Link className={style.textButton} to={to} onClick={onClick}>
      {children}
    </Link>
  );
}
