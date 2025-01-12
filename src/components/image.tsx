import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";

type Props = {
  className?: string;
  image: IGatsbyImageData | null | undefined;
  alt: string | null | undefined;
};

export default function Image(props: Props): React.JSX.Element | null {
  const { className, image, alt } = props;

  if (!image) {
    return null;
  }

  return <GatsbyImage className={className} image={image} alt={alt ?? ""} objectFit="contain" />;
}
