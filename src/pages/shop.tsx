import { graphql, useStaticQuery } from "gatsby";
import React from "react";

import Button from "src/components/buttons/button";
import Image from "src/components/image";
import HeadLayout from "src/components/layouts/headLayout";
import ShopNavigation from "src/components/shop/shopNavigation";
import useShop from "src/components/shop/useShop";
import * as style from "src/pages/shop.module.css";

export default function Shop(): React.JSX.Element {
  const { allShopProducts } = useStaticQuery<Queries.ShopQuery>(graphql`
    query Shop {
      allShopProducts: allMarkdownRemark(
        sort: { frontmatter: { order_index: ASC } }
        filter: { fileRelativeDirectory: { eq: "shop" } }
      ) {
        nodes {
          ...ShopProductFragment
        }
      }
    }
  `);

  const { cartItemCount } = useShop(allShopProducts);

  return (
    <>
      <ShopNavigation cartItemCount={cartItemCount} goToCart />
      <h1>T-shirts</h1>
      <div className={style.shopProducts}>
        {allShopProducts.nodes.map((shopProductNode) => {
          if (!shopProductNode.fileName || !shopProductNode.frontmatter) {
            return null;
          }

          return (
            <div key={shopProductNode.id}>
              <Button internalHref={shopProductNode.slug}>
                <Image
                  className={style.shopProductImage}
                  image={shopProductNode.linkedFiles?.[0]?.childImageSharp?.gatsbyImageData}
                  alt={shopProductNode.frontmatter.title}
                />
                <div>{shopProductNode.frontmatter.title}</div>
                <div>${shopProductNode.frontmatter.price}</div>
              </Button>
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
