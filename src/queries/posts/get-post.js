import { gql } from "@apollo/client";
import MenuFragment from "../get-menus";
import {HeaderFooter} from "../get-menus";
import SeoFragment from "../seo";

export const GET_POST = gql`
	query GET_POST($uri: String) {
      ${HeaderFooter}
	  post: postBy(uri: $uri) {
	    id
	    title
	    content
	    slug
	    uri
	    
	  }
	}
	${MenuFragment}
	${SeoFragment}
`;

export const GET_POST_BY_ID = gql`


	query GET_POST_BY_ID($id: ID!)   {
			post(idType: DATABASE_ID, id: $id) {
			id
			title
			content
			slug
			uri
			status
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