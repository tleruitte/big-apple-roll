import clsx from "clsx";
import React from "react";

import * as classNames from "src/components/buttons/textButton.module.css";
import useButton, { ButtonProps } from "src/components/buttons/useButton";

type Props = {
  children?: React.ReactNode;
} & ButtonProps;

export default function TextButton(props: Props): React.JSX.Element {
  const { children } = props;

  const { id, isCurrent, handleClick } = useButton(props);

  return (
    <div
      className={clsx(classNames.textButton, {
        [classNames.isCurrent]: isCurrent,
      })}
      data-id={id}
      onClick={handleClick}
    >
      <div className={classNames.textButtonText}>{children}</div>
    </div>
  );
}
