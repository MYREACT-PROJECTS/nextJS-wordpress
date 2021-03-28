import { gql } from "@apollo/client";


export const GET_PAGE_BY_ID = gql`
	query GET_PAGE_BY_ID($id: ID!) {
	
	  page(idType: DATABASE_ID, id: $id) {
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
		status
	  }
      footerMenus: menuItems(where: {location: HCMS_MENU_FOOTER}) {
        edges {
          node {
          id
          label
          path
          url
          }
        }
      }
      headerMenus: menuItems(where: {location: HCMS_MENU_HEADER, parentId: "0"}) {
        edges {
          node {
            id
            label
            path
            url
          }
        }
    }
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
	}
	
`;