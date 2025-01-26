import clsx from "clsx";
import React from "react";

import * as classNames from "src/components/buttons/surfaceButton.module.css";
import useButton, { ButtonProps } from "src/components/buttons/useButton";
import switchOn from "src/helpers/switchOn";

export type SurfaceButtonColor = "accent1" | "accent2" | "accent3";

type Props = {
  color?: SurfaceButtonColor;
  size?: "small" | "large";
  banner?: string;
  children: React.ReactNode;
} & ButtonProps;

export default function SurfaceButton(props: Props): React.JSX.Element {
  const { color = "accent1", size, banner, children } = props;

  const { id, disabled, handleClick } = useButton(props);

  return (
    <button
      className={clsx(
        classNames.button,
        switchOn(color, {
          accent1: classNames.isAccent1,
          accent2: classNames.isAccent2,
          accent3: classNames.isAccent3,
        }),
        size
          ? switchOn(size, {
              small: classNames.isSmall,
              large: classNames.isLarge,
            })
          : null,
        {
          [classNames.isDisabled]: disabled,
        },
      )}
      data-id={id}
      onClick={handleClick}
    >
      {banner ? (
        <div className={classNames.buttonBanner}>
          <span className={classNames.buttonBannerText}>{banner}</span>
        </div>
      ) : null}
      <div className={classNames.buttonLabel}>
        <span className={classNames.buttonLabelText}>{children}</span>
      </div>
    </button>
  );
}
