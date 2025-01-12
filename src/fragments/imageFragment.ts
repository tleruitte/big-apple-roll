import { graphql } from "gatsby";

export const imageFragment = graphql`
  fragment ImageFragment on File {
    id
    name
    childImageSharp {
      gatsbyImageData(placeholder: NONE)
    }
  }
`;
