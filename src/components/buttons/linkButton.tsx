import { Link } from "gatsby";
import React from "react";

import * as style from "src/components/buttons/linkButton.module.css";

type Props = {
  to: string;
  children: React.ReactNode;
};

export default function LinkButton(props: Props): React.JSX.Element {
  const { to, children } = props;

  return (
    <Link to={to} className={style.linkButton} draggable={false}>
      {children}
    </Link>
  );
}
