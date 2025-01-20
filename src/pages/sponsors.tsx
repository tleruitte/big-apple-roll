import clsx from "clsx";
import { graphql, useStaticQuery } from "gatsby";
import React, { useMemo } from "react";

import Image from "src/components/image";
import HeadLayout from "src/components/layouts/headLayout";
import { SponsorType } from "src/fragments/sponsors/sponsorFragment";
import isEnumValue from "src/helpers/isEnumValue";
import switchOn from "src/helpers/switchOn";
import * as style from "src/pages/sponsors.module.css";

export default function Sponsors(): React.JSX.Element {
  const data = useStaticQuery<Queries.SponsorsQuery>(graphql`
    query Sponsors {
      groupedSponsors: allMarkdownRemark(
        filter: { fileRelativeDirectory: { eq: "sponsors" } }
        sort: { fileName: ASC }
      ) {
        group(field: { frontmatter: { type: SELECT } }) {
          nodes {
            ...SponsorFragment
          }
        }
      }
      sponsorImageLogos: allFile(
        filter: { relativeDirectory: { eq: "sponsors" }, extension: { nin: ["md", "svg"] } }
      ) {
        nodes {
          ...ImageFragment
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
    return data.groupedSponsors.group.reduce<
      Record<SponsorType, Queries.SponsorsQuery["groupedSponsors"]["group"][number]["nodes"]>
    >(
      (acc, group) => {
        const { type } = group.nodes[0].frontmatter ?? {};
        if (!isEnumValue(type, SponsorType)) {
          return acc;
        }
        return {
          ...acc,
          [type]: group.nodes,
        };
      },
      {
        [SponsorType.Presenting]: [],
        [SponsorType.Supporting]: [],
        [SponsorType.General]: [],
      },
    );
  }, [data.groupedSponsors.group]);

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
                const { title, url } = sponsor.frontmatter ?? {};
                const sponsorLogo = sponsor.fileName
                  ? sponsorLogosByName[sponsor.fileName]
                  : undefined;
                if (!title || !url || !sponsorLogo) {
                  return null;
                }

                return (
                  <a
                    key={sponsor.id}
                    className={style.sponsor}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {sponsorLogo.type === "image" &&
                    sponsorLogo.node.childImageSharp?.gatsbyImageData ? (
                      <Image
                        className={style.sponsorLogo}
                        image={sponsorLogo.node.childImageSharp.gatsbyImageData}
                        alt={title}
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
