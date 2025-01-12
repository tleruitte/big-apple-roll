import React from "react";
import { Link as GatsbyLink } from "gatsby";

type Props = {
  className?: string;
  to: string | null;
  children: React.ReactNode;
};

export default function Link(props: Props): React.JSX.Element | null {
  const { className, to, children } = props;

  if (!to) {
    return <span className={className}>{children}</span>;
  }

  return (
    <GatsbyLink to={to} className={className} draggable={false}>
      {children}
    </GatsbyLink>
  );
}
