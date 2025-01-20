import React from "react";

import * as style from "src/components/buttons/textButton.module.css";
import useButton, { ButtonProps } from "src/components/buttons/useButton";

type Props = {
  children?: React.ReactNode;
} & ButtonProps;

export default function TextButton(props: Props): React.JSX.Element {
  const { children } = props;

  const { id, handleClick } = useButton(props);

  return (
    <div className={style.textButton} id={id} onClick={handleClick}>
      <div className={style.textButtonText}>{children}</div>
    </div>
  );
}
