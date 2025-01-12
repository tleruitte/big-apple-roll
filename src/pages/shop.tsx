import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";

import * as style from "src/pages/shop.module.css";
import HeadLayout from "src/components/layouts/headLayout";

export default function Shop(): React.JSX.Element {
  const data = useStaticQuery<Queries.ShopQuery>(graphql`
    query Shop {
      shopItems: allMarkdownRemark(filter: { fileRelativeDirectory: { eq: "shop" } }) {
        nodes {
          ...ShopItemFragment
        }
      }
    }
  `);

  return (
    <div className={style.shop}>
      <h1>T-shirts</h1>
      {data.shopItems.nodes.map((node) => {
        if (!node.slug) {
          return null;
        }

        return (
          <div key={node.id}>
            item:
            <Link to={node.slug} draggable={false}>
              {node.frontmatter?.title}
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export function Head() {
  return <HeadLayout pageTitle="" />;
}
