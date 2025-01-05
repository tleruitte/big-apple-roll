import React, { useMemo } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import clsx from "clsx";

import * as style from "src/pages/sponsors.module.css";
import isEnumValue from "src/helpers/isEnumValue";
import HeadLayout from "src/components/layouts/headLayout";
import switchOn from "src/helpers/switchOn";

enum SponsorType {
  Presenting = "presenting",
  Supporting = "supporting",
  General = "general",
}

export default function Sponsors(): React.JSX.Element {
  const data = useStaticQuery<Queries.SponsorsQuery>(graphql`
    query Sponsors {
      sponsors: allFile(
        filter: { relativeDirectory: { eq: "sponsors" }, extension: { eq: "md" } }
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
      sponsorImageLogos: allFile(
        filter: { relativeDirectory: { eq: "sponsors" }, extension: { nin: ["md", "svg"] } }
      ) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(placeholder: NONE)
          }
        }
      }
      sponsorSVGLogos: allFile(
        filter: { relativeDirectory: { eq: "sponsors" }, extension: { eq: "svg" } }
      ) {
        nodes {
          name
          publicURL
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
    const sponsorLogosByName: Record<
      string,
      | {
          type: "image";
          node: Queries.SponsorsQuery["sponsorImageLogos"]["nodes"][0];
        }
      | {
          type: "svg";
          node: Queries.SponsorsQuery["sponsorSVGLogos"]["nodes"][0];
        }
    > = {};

    data.sponsorImageLogos.nodes.forEach((node) => {
      sponsorLogosByName[node.name] = { type: "image", node };
    });

    data.sponsorSVGLogos.nodes.forEach((node) => {
      sponsorLogosByName[node.name] = { type: "svg", node };
    });

    return sponsorLogosByName;
  }, [data.sponsorImageLogos.nodes, data.sponsorSVGLogos.nodes]);

  return (
    <div>
      {Object.entries(sponsorsByType).map(([type, sponsors]) => {
        return (
          <React.Fragment key={type}>
            <h1>{type} sponsors</h1>
            {type === SponsorType.Presenting ? (
              <p className={style.description}>
                A huge “Thank You” to all of our generous sponsors. BAR Sponsors donate money,
                services, skate equipment, accessories and free or discounted entrance fees to
                skating instruction & events. We use many of these items as prizes in our raffle,
                which help pay for the whole event. This event would not be possible without your
                support.
              </p>
            ) : null}
            <div
              className={clsx(
                style.sponsors,
                isEnumValue(type, SponsorType)
                  ? switchOn(type, {
                      [SponsorType.Presenting]: style.isPresenting,
                      [SponsorType.Supporting]: style.isSupporting,
                      [SponsorType.General]: null,
                    })
                  : null,
              )}
            >
              {sponsors.map((sponsor) => {
                const { title, url } = sponsor.childMarkdownRemark?.frontmatter ?? {};
                const sponsorLogo = sponsorLogosByName[sponsor.name];
                if (!title || !url || !sponsorLogo) {
                  return null;
                }

                return (
                  <a
                    key={sponsor.name}
                    className={style.sponsor}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {sponsorLogo.type === "image" &&
                    sponsorLogo.node.childImageSharp?.gatsbyImageData ? (
                      <GatsbyImage
                        className={style.sponsorLogo}
                        image={sponsorLogo.node.childImageSharp.gatsbyImageData}
                        alt={title}
                        objectFit="contain"
                        sizes=""
                      />
                    ) : null}
                    {sponsorLogo.type === "svg" ? (
                      <img
                        className={style.sponsorLogo}
                        src={sponsorLogo.node.publicURL ?? undefined}
                        alt={title}
                      />
                    ) : null}
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
  return <HeadLayout pageTitle="Sponsors" />;
}
