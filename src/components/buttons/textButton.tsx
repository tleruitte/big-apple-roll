import React from "react";

import * as style from "src/components/buttons/textButton.module.css";
import Link from "src/components/link";

type Props = {
  id?: string;
  to?: string;
  onClick?: React.MouseEventHandler;
  children?: React.ReactNode;
};

export default function TextButton(props: Props): React.JSX.Element {
  const { id, to, onClick, children } = props;

  return (
    <Link className={style.textButton} id={id} to={to} onClick={onClick}>
      {children}
    </Link>
  );
}
