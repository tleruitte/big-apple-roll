import React from "react";

import * as style from "src/components/buttons/button.module.css";
import useButton, { ButtonProps } from "src/components/buttons/useButton";

type Props = { children: React.ReactNode } & ButtonProps;

export default function Button(props: Props): React.JSX.Element | null {
  const { children } = props;

  const { id, handleClick } = useButton(props);

  return (
    <div className={style.button} data-id={id} onClick={handleClick}>
      {children}
    </div>
  );
}
