import React from "react";
import { Link as GatsbyLink } from "gatsby";

type Props = {
  className?: string;
  to?: string;
  onClick?: React.MouseEventHandler;
  children: React.ReactNode;
};

export default function Link(props: Props): React.JSX.Element | null {
  const { className, to, onClick, children } = props;

  if (!to) {
    return (
      <span className={className} onClick={onClick}>
        {children}
      </span>
    );
  }

  return (
    <GatsbyLink to={to} className={className} draggable={false} onClick={onClick}>
      {children}
    </GatsbyLink>
  );
}
