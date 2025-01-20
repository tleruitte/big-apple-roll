import clsx from "clsx";
import React from "react";

import * as style from "src/components/buttons/surfaceButton.module.css";
import useButton, { ButtonProps } from "src/components/buttons/useButton";
import switchOn from "src/helpers/switchOn";

export type SurfaceButtonColor = "accent1" | "accent2" | "accent3";

type Props = {
  color?: SurfaceButtonColor;
  size?: "large";
  banner?: string;
  children: React.ReactNode;
} & ButtonProps;

export default function SurfaceButton(props: Props): React.JSX.Element {
  const { color = "accent1", size, banner, children } = props;

  const { id, handleClick } = useButton(props);

  return (
    <div
      className={clsx(
        style.button,
        switchOn(color, {
          accent1: style.isAccent1,
          accent2: style.isAccent2,
          accent3: style.isAccent3,
        }),
        size
          ? switchOn(size, {
              large: style.isLarge,
            })
          : null,
      )}
      data-id={id}
      onClick={handleClick}
    >
      {banner ? (
        <div className={style.buttonBanner}>
          <span className={style.buttonBannerText}>{banner}</span>
        </div>
      ) : null}
      <div className={style.buttonLabel}>
        <span className={style.buttonLabelText}>{children}</span>
      </div>
    </div>
  );
}
