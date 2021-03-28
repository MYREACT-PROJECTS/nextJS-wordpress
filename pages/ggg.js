import { gql } from "@apollo/client";
import client from '../src/apollo/client'
import Layout from "../src/components/layout";
import {useRouter} from "next/router";
import {getPreviewRedirectUrl} from '../src/utils/redirects'
import { isEmpty } from "lodash";
import Header from "../src/components/layout/header/Header";
import axios from 'axios';
import React, { useState } from 'react';


const ggg =({data})=>{

    const router = useRouter();
    const [loginFields, setLoginFields]= useState({
        username:"",
        password:"",
    });
    
    const [errorMessage,setErrorMessage]=useState(null)
    const [loading, setloading]= useState(false);
   
    const  OnFormSubmit =(event)=>{
    event.preventDefault();
    setErrorMessage(null);
    const {postType,previewPostId} = router?.query ?? {}
     axios ({
        data:{
            username: username,
            password:password
        },
        method:"post",
        url:"/api/login"
    
    })

    //const daat= response.data;
    .then((response) => {
        console.log(response.data);
        setloading(false)
        const {success} = response?.data ?? {};
        console.log("resgrat!!!!!");
        //router.push("/")
        //const previewPostId =65
      //  router.push(`/blog/preview/${previewPostId}/`)
     


        
    if ( success && postType && previewPostId ) {
       // if ( success  ){ 
       const previewUrl = getPreviewRedirectUrl(postType, previewPostId);
        router.push(previewUrl)
        console.log("resgrat!!!!!");

    }
        //return response?.data?.success;  

        
        
        
      
      },

      (error)=>{
        setloading(false)
        return false
    })
        
    
    }
    const handleOnChange = (event) => {
        event.preventDefault();

    setLoginFields({ ...loginFields, [event.target.name]: event.target.value });
    };
    
    const { username, password } = loginFields;
    //////////////////////////////////////
    //console.log('data',data)
    return (
        <Layout data={data}>
            <div className="login-form bg-gray-100 rounded-lg p-8 md:ml-auto mt-10 md:mt-12 w-5/12 m-auto">
        <h4 className="text-gray-900 text-lg font-medium title-font mb-5 block">Login</h4>
        {!isEmpty(errorMessage) && (
            <div
                className="text-red-600"
                dangerouslySetInnerHTML={{ __html: sanitize( errorMessage ) }}
            />
        )}
        <form onSubmit={OnFormSubmit} className="mb-4">
            <label className="leading-7 text-sm text-gray-600">
                Username:
                <input
                    type="text"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    name="username"
                    value={username}
                    onChange={handleOnChange}
                />
            </label>
            <br />
            <label className="leading-7 text-sm text-gray-600">
                Password:
                <input
                    type="password"
                    className="mb-8 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    name="password"
                    value={password}
                    onChange={handleOnChange}
                />
            </label>
            <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" type="submit">
                Login
            </button>
            {loading ? <p>Loading...</p> : null  }
        </form>
    </div>
    </Layout>

    

    )
}

export default ggg

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
