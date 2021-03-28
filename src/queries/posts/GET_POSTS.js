import { gql } from '@apollo/client'
//import MenuFragment from '../fragments/menus'
//import SeoFragment from "../fragments/seo";
//import {HeaderFooter} from "../get-menus";
//import ImageFragment from "../fragments/image";

/**
 * Get Header menu
 *
 */
export const GET_POSTS = gql`
query GET_POSTS($uri: String, $perPage: Int, $offset: Int) {
  header: getHeader {
    favicon
    siteLogoUrl
    siteTagLine
    siteTitle
  }
  footer: getFooter {
    copyrightText
    sidebarOne
    sidebarTwo
    socialLinks {
      iconName
      iconUrl
    }
  }
    headerMenus: menuItems(where: {location: HCMS_MENU_HEADER, parentId: "0"}) {
      edges {
        node {
          id
          label
          path
          url
  
          childItems {
            edges {
              node {
                id
                label
                path
                url
              }
            }
          }
        }
      }
    }
    footerMenus: menuItems(where: {location: HCMS_MENU_FOOTER, parentId: "0"}) {
      edges {
        node {
          id
          label
          path
          url
  
            childItems {
             edges {
              node {
                id
                label
                path
                url
              }
            }
          }
        }
      }
    }
  
  page: pageBy(uri: $uri) {
    id
    title
    content
    slug
    uri
    seo{
      breadcrumbs {
        text
        url
      }
      title
      metaDesc
      metaRobotsNoindex
      metaRobotsNofollow
      opengraphAuthor
      opengraphDescription
      opengraphTitle
      schemaDetails
      opengraphImage {
        sourceUrl
      }
      opengraphSiteName
      opengraphPublishedTime
      opengraphModifiedTime
      twitterTitle
      twitterDescription
      twitterImage {
        sourceUrl
      }
    }
  }
  posts: posts(where: {offsetPagination: {size: $perPage, offset:  $offset}}) {
    edges {
      node {
        id
        title
        excerpt
        slug
        featuredImage {
          node {
            altText
            sourceUrl
          }
        }
      }
    }
    pageInfo {
      offsetPagination {
        total
      }
    }
  }
}

`


export const GET_TOTAL_POSTS_COUNT = gql`
  query GET_TOTAL_POSTS_COUNT {
  postsCount: posts {
      pageInfo {
        offsetPagination {
          total
        }
      }
    }
  }
`