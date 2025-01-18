import React from "react";
import { Link as GatsbyLink } from "gatsby";

type Props = {
  className?: string;
  id?: string;
  to?: string | null;
  onClick?: React.MouseEventHandler;
  children: React.ReactNode;
};

export default function Link(props: Props): React.JSX.Element | null {
  const { className, id, to, onClick, children } = props;

  if (!to) {
    return (
      <span className={className} data-id={id} onClick={onClick}>
        {children}
      </span>
    );
  }

  return (
    <GatsbyLink to={to} className={className} data-id={id} draggable={false} onClick={onClick}>
      {children}
    </GatsbyLink>
  );
}
