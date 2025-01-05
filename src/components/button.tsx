import clsx from "clsx";
import { Link } from "gatsby";
import React from "react";

import * as style from "src/components/button.module.css";
import switchOn from "src/helpers/switchOn";

type Props = {
  color?: "accent1" | "accent2" | "accent3";
  size?: "large";
  banner?: string;
  label: string;
  to: string;
};

export default function Button(props: Props): React.JSX.Element {
  const { color: color = "accent1", size, banner, label, to } = props;

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
    >
      {banner ? (
        <div className={style.buttonBanner}>
          <span className={style.buttonBannerText}>{banner}</span>
        </div>
      ) : null}
      <div className={style.buttonLabel}>
        <span className={style.buttonLabelText}>{label}</span>
      </div>
    </Link>
  );
}
