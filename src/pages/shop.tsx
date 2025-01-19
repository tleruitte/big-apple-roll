import { graphql, useStaticQuery } from "gatsby";
import React from "react";

import Image from "src/components/image";
import HeadLayout from "src/components/layouts/headLayout";
import Link from "src/components/link";
import ShopNavigation from "src/components/shop/shopNavigation";
import useShop from "src/components/shop/useShop";
import * as style from "src/pages/shop.module.css";

export default function Shop(): React.JSX.Element {
  const { shopProducts, shopProductsImages } = useStaticQuery<Queries.ShopQuery>(graphql`
    query Shop {
      shopProducts: allMarkdownRemark(
        sort: { frontmatter: { order_index: ASC } }
        filter: { fileRelativeDirectory: { eq: "shop" } }
      ) {
        nodes {
          ...ShopProductFragment
        }
      }
      shopProductsImages: allFile(
        filter: { relativeDirectory: { eq: "shop" }, extension: { ne: "md" } }
        sort: { name: ASC }
      ) {
        nodes {
          ...ImageFragment
        }
      }
    }
  `);

  const { cartItemCount, shopProductImagesByName } = useShop(shopProducts, shopProductsImages);

  return (
    <>
      <ShopNavigation cartItemCount={cartItemCount} goToCart />
      <h1>T-shirts</h1>
      <div className={style.shopProducts}>
        {shopProducts.nodes.map((shopProductNode) => {
          if (!shopProductNode.fileName || !shopProductNode.frontmatter) {
            return null;
          }

          return (
            <div key={shopProductNode.id}>
              <Link className={style.shopProductLink} to={shopProductNode.slug}>
                <Image
                  className={style.shopProductImage}
                  image={
                    shopProductImagesByName[shopProductNode.fileName]?.[0]?.childImageSharp
                      ?.gatsbyImageData
                  }
                  alt={shopProductNode.frontmatter.title}
                />
                <div>{shopProductNode.frontmatter.title}</div>
                <div>${shopProductNode.frontmatter.price}</div>
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
