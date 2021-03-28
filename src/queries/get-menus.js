import { gql} from '@apollo/client';
import MenuFragment from './menus'

 export const HeaderFooter= `
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
          ...MenuFragment

        childItems {
          edges {
            node {
              ...MenuFragment
            }
          }
        }
      }
    }
  }
  footerMenus: menuItems(where: {location: HCMS_MENU_FOOTER, parentId: "0"}) {
    edges {
      node {
          ...MenuFragment

          childItems {
           edges {
            node {
              ...MenuFragment
            }
          }
        }
      }
    }
  }
  

`

  const GET_MENUS = gql`
query MyQuery {
 ${HeaderFooter}
 page: pageBy(uri:"/") {
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
  }
  
  ${MenuFragment}
`
export default GET_MENUS