import clsx from "clsx";
import React from "react";

import * as style from "src/components/buttons/button.module.css";
import Link from "src/components/link";
import switchOn from "src/helpers/switchOn";

export type ButtonColor = "accent1" | "accent2" | "accent3";

type Props = {
  color?: ButtonColor;
  size?: "large";
  banner?: string;
  to?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

export default function Button(props: Props): React.JSX.Element {
  const { color = "accent1", size, banner, to, onClick, children } = props;

  return (
    <Link
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
      to={to}
      onClick={onClick}
    >
      {banner ? (
        <div className={style.buttonBanner}>
          <span className={style.buttonBannerText}>{banner}</span>
        </div>
      ) : null}
      <div className={style.buttonLabel}>
        <span className={style.buttonLabelText}>{children}</span>
      </div>
    </Link>
  );
}
