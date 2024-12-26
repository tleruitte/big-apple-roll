import "./sponsors.css";

import React, { useMemo } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { keyBy } from "lodash";

import clsx from "clsx";

import LayoutHead from "../components/layoutHead";
import isEnumValue from "../helpers/isEnumValue";

enum SponsorType {
  Presenting = "presenting",
  Supporting = "supporting",
  General = "general",
}

export default function Sponsors(): React.JSX.Element {
  const data = useStaticQuery<Queries.SponsorsQuery>(graphql`
    query Sponsors {
      sponsors: allFile(
        filter: {
          relativeDirectory: { eq: "sponsors" }
          extension: { eq: "md" }
        }
        sort: { relativePath: ASC }
      ) {
        nodes {
          name
          childMarkdownRemark {
            frontmatter {
              title
              type
              url
            }
          }
        }
      }
      sponsorLogos: allFile(
        filter: {
          relativeDirectory: { eq: "sponsors" }
          extension: { ne: "md" }
        }
      ) {
        nodes {
          name
          publicURL
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  `);

  const sponsorsByType = useMemo(() => {
    return data.sponsors.nodes.reduce<
      Record<SponsorType, Queries.SponsorsQuery["sponsors"]["nodes"]>
    >(
      (acc, node) => {
        const { type } = node.childMarkdownRemark?.frontmatter ?? {};
        if (!type || !isEnumValue(type, SponsorType)) {
          return acc;
        }

        return {
          ...acc,
          [type]: [...acc[type], node],
        };
      },
      {
        [SponsorType.Presenting]: [],
        [SponsorType.Supporting]: [],
        [SponsorType.General]: [],
      },
    );
  }, [data.sponsors.nodes]);

  const sponsorLogosByName = useMemo(() => {
    return keyBy(data.sponsorLogos.nodes, "name");
  }, [data.sponsorLogos.nodes]);

  return (
    <div className="sponsors">
      {Object.entries(sponsorsByType).map(([type, sponsors]) => {
        return (
          <React.Fragment key={type}>
            <h1>{type} sponsors</h1>
            {type === SponsorType.Presenting ? (
              <p className="sponsors-intro">
                A huge “Thank You” to all of our generous sponsors. BAR Sponsors
                donate money, services, skate equipment, accessories and free or
                discounted entrance fees to skating instruction & events. We use
                many of these items as prizes in our raffle, which help pay for
                the whole event. This event would not be possible without your
                support.
              </p>
            ) : null}
            <div className={clsx("sponsors-grid", `sponsors-grid--${type}`)}>
              {sponsors.map((sponsor) => {
                const { title, url } =
                  sponsor.childMarkdownRemark?.frontmatter ?? {};
                const sponsorLogo = sponsorLogosByName[sponsor.name];
                if (!title || !url || !sponsorLogo) {
                  return null;
                }

                return (
                  <a
                    key={sponsor.name}
                    className="sponsors-sponsor"
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {sponsorLogo.childImageSharp?.gatsbyImageData ? (
                      <GatsbyImage
                        className="sponsors-sponsorLogo"
                        image={sponsorLogo.childImageSharp.gatsbyImageData}
                        alt={title}
                        objectFit="contain"
                        sizes=""
                      />
                    ) : (
                      <img
                        className="sponsors-sponsorLogo"
                        src={sponsorLogo.publicURL ?? undefined}
                        alt={title}
                      />
                    )}
                  </a>
                );
              })}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export function Head() {
  return <LayoutHead pageTitle="Sponsors" />;
}
