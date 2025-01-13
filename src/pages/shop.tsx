import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import * as style from "src/pages/shop.module.css";
import HeadLayout from "src/components/layouts/headLayout";
import Link from "src/components/link";
import Image from "src/components/image";
import ShopNavigation from "src/components/shopNavigation";
import useShopItems from "src/components/shop/useShopItems";

export default function Shop(): React.JSX.Element {
  const { shopItems, shopImages } = useStaticQuery<Queries.ShopQuery>(graphql`
    query Shop {
      shopItems: allMarkdownRemark(
        sort: { frontmatter: { order_index: ASC } }
        filter: { fileRelativeDirectory: { eq: "shop" } }
      ) {
        nodes {
          ...ShopItemFragment
        }
      }
      shopImages: allFile(
        filter: { relativeDirectory: { eq: "shop" }, extension: { ne: "md" } }
        sort: { name: ASC }
      ) {
        nodes {
          ...ImageFragment
        }
      }
    }
  `);

  const { shopImagesByName } = useShopItems(shopItems, shopImages);

  return (
    <>
      <ShopNavigation goToCart />
      <h1>T-shirts</h1>
      <div className={style.shopItems}>
        {shopItems.nodes.map((shopItemNode) => {
          if (!shopItemNode.fileName || !shopItemNode.frontmatter) {
            return null;
          }

          return (
            <div key={shopItemNode.id}>
              <Link className={style.shopItemLink} to={shopItemNode.slug}>
                <Image
                  className={style.shopItemImage}
                  image={
                    shopImagesByName[shopItemNode.fileName]?.[0]?.childImageSharp?.gatsbyImageData
                  }
                  alt={shopItemNode.frontmatter.title}
                />
                <div>{shopItemNode.frontmatter.title}</div>
                <div>${shopItemNode.frontmatter.price}</div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}

export function Head() {
  return <HeadLayout pageTitle="" />;
}
