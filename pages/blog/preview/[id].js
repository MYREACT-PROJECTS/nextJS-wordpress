import client from "../../../src/apollo/client";
import Layout from "../../../src/components/layout/index";
import {handleRedirectsAndReturnData} from "../../../src/utils/slugs";
//import {getAuthToken} from "../../../src/utils/cookies";
import {getLoginPreviewRedirectUrl} from "../../../src/utils/redirects";
import {GET_POST_BY_ID} from "../../../src/queries/posts/get-post";
import {sanitize} from "../../../src/utils/miscellanous";
import { gql } from "@apollo/client";
import { PossibleTypeExtensionsRule } from "graphql";


const PostPreview = ({ data }) => {
    console.log("ddd",data)
    return (
        <Layout data={data} isPost>
            <  div className='text-right'
              dangerouslySetInnerHTML={{__html: sanitize(data?.post?.content ?? {})}}/>
             
        </Layout>
    );
}

export default PostPreview;

export async function getServerSideProps(context) {
   
  
    //const authToken = getAuthToken(context.req);

    const { params } = context || {}
    console.log(params)
    console.log(params.id)

    const { data, errors } = await client.query({
        query: GET_POST_BY_ID,
        variables: {
            id: Number(params?.id ?? ''),
        },
        
        
       
      
      
    });

    const defaultProps = {
        props: {
            data:  data || {}
        }
    };
    console.log(defaultProps)
    const loginRedirectURL = getLoginPreviewRedirectUrl('post', params?.id ?? '' );

    return handleRedirectsAndReturnData( defaultProps, data, errors, 'post', true, loginRedirectURL );

}
