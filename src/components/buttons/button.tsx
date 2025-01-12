import clsx from "clsx";
import { Link } from "gatsby";
import React from "react";

import * as style from "src/components/buttons/button.module.css";
import switchOn from "src/helpers/switchOn";

type Props = {
  color?: "accent1" | "accent2" | "accent3";
  size?: "large";
  banner?: string;
  to: string;
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
      draggable={false}
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
