import { graphql } from "gatsby";

export const imageFragment = graphql`
  fragment ImageFragment on File {
    id
    name
    publicURL
    childImageSharp {
      gatsbyImageData(placeholder: NONE)
    }
  }
`;
