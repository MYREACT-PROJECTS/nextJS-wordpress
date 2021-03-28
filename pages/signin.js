//import { GET_PAGE } from "../src/queries/GET_PAGE";
import client from '../src/apollo/client'
import Layout from '../src/components/layout/index'
import { gql } from "@apollo/client";
//import {handleRedirectsAndReturnData} from '../src/utils/slugs'
const signin =({data})=>{

    return "signssssin"
}

export default signin;   

export async function getStaticProps(context) {
    const GET_PAGE = gql`
	 query GET_PAGE($uri: String) {
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
	 
const { data, errors } = await client.query({
    query: GET_PAGE,
    variables :{
        uri:'/'
    }
  
});

const defaultProps = {
    props: {
        data:  data || {}
    },
    /**
     * Revalidate means that if a new request comes to server, then every 1 sec it will check
     * if the data is changed, if it is changed then it will update the
     * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
     */
    revalidate: 1,
};

return defaultProps;
}

