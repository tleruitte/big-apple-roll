import clsx from "clsx";
import React from "react";

import * as classNames from "src/components/buttons/linkButton.module.css";
import useButton, { ButtonProps } from "src/components/buttons/useButton";

type Props = {
  noDecoration?: boolean;
  children: React.ReactNode;
} & ButtonProps;

export default function LinkButton(props: Props): React.JSX.Element | null {
  const { noDecoration, children } = props;

  const { id, href, handleClick } = useButton(props);

  if (!href) {
    return null;
  }

  return (
    <a
      className={clsx(classNames.linkButton, {
        [classNames.isNoDecoration]: noDecoration,
      })}
      href={href}
      draggable={false}
      data-id={id}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
