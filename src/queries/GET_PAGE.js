import { gql } from "@apollo/client";
import MenuFragment from "./menus";
import SeoFragment from './seo'

 export  const GET_PAGE = gql`
	 query GET_PAGE($uri: String) {
	 page: pageBy(uri: $uri) {
	    id
	    title
	    content
	    slug
	    uri
      seo{
        ...SeoFragment
        
      }
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
	 `
	 
	  
