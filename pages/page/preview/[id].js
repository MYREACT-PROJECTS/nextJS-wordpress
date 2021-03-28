import client from "../../../src/apollo/client";
import { GET_PAGE_BY_ID} from "../../../src/queries/pages/get-page";
import Layout from "../../../src/components/layout/index";
import {handleRedirectsAndReturnData} from "../../../src/utils/slugs";
import {getAuthToken} from "../../../src/utils/cookies";
import {sanitize} from "../../../src/utils/miscellanous";
import {getLoginPreviewRedirectUrl} from "../../../src/utils/redirects";
import { number } from "prop-types";

const PagePreview = ({ data }) => {
    console.log("data",data)
    return (
        <Layout data={data} >
            <div dangerouslySetInnerHTML={{__html: sanitize(data?.page?.content ?? {})}}/>
        </Layout>
    );
}

export default PagePreview;     

export async function getServerSideProps(context){
    //const authToken = getAuthToken(context.req);
    const {params} = context || {}
    const {data,errors} = await client.query({
        query:GET_PAGE_BY_ID,
        variables:{
            id:Number(params?.id ?? ''),

        },
        
    }) 



    const defaultProps={
        props: { 
        data : data || {}

        }
    }

    const loginRedirectURL = getLoginPreviewRedirectUrl('page', params?.id ?? '' );

    return handleRedirectsAndReturnData( defaultProps, data, errors, 'page', true, loginRedirectURL );
}