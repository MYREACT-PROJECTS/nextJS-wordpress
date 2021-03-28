import client from "../src/apollo/Client"
import { GET_PAGES } from "../src/queries/GET_PAGES"
//import  {GET_PAGE}  from  '../src/queries/GET_PAGE'
import { useRouter } from 'next/router'
import { gql } from "@apollo/client";
import MenuFragment from '../src/queries/menus'
import SeoFragment from '../src/queries/seo'
import Layout from '../src/components/layout/index'
import { FALLBACK, handleRedirectsAndReturnData } from '../src/utils/slugs';





import { isEmpty } from "lodash";
import { isCustomPageUri } from "../src/utils/slugs";


const pages =({data})=>{
    console.warn('data',data)
    // pages/posts/[id].js
    const router = useRouter()
    console.log('data',router)
	//console.log('params',params)




  
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  } 


  //Render post...

  console.log('data',data)


    return (
		<Layout data= {data}>
           {data?.page?.content}
		</Layout>
	)

}

export default pages ;

export async function getStaticPaths () {
	const { data } = await client.query({
		query: GET_PAGES
	})

	const pathsData = []

	if( ! isEmpty(data) ) {
		//console.log("datapath",data)
		/**
		 * Check if slug existsing and exclude the custom pages, from dynamic pages creation
		 * as they will automatically be generated when we create their respective directories
		 * with their names under 'pages'.
		 */
		const path= data?.pages?.nodes?.map((page) => {
		// if ( ! isEmpty(page?.uri) && ! isCustomPageUri(page?.uri)) {
          
		const slugs=page?.uri?.split('/')?.filter(pageSlue=>pageSlue)
	
            
			pathsData.push({ params: { slug: [`${slugs}`] } })
		//}
	})
	
	}
    ///console.log("datapath",data)
    console.log("slugs",pathsData)
	return {
		paths: pathsData,
		fallback:FALLBACK
	}
}


/////////////////////////////////////////////////
export async function getStaticProps({ params }) {
	console.log("params",params)
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
	 

    const { data,errors} = await client.query({
        query: GET_PAGE,
        variables: {
            uri: params?.slug.join("/"),
        },
    });
	    //const {datadata}= await data.json
      // console.warn('data',datadata)
	  console.log("params",params)

    const defaultProps = {
        props: {
	        data:  data || {},
			params:"hh"
        },

    }
	return handleRedirectsAndReturnData(defaultProps, data, errors, 'page')


	
}
