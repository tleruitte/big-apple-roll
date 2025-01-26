import React from "react";

type Props = {
  html: string | null | undefined;
};

export default function HTML(props: Props): React.JSX.Element | null {
  const { html } = props;

  return <div dangerouslySetInnerHTML={{ __html: html ?? "" }}></div>;
}
