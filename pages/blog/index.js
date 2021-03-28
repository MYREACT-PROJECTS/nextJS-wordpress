import client from "../../src/apollo/client";
import Layout from "../../src/components/layout/index";
import { PER_PAGE_FIRST, totalPagesCount } from "../../src/utils/pagination";
import Pagination from "../../src/utils/pagination";
import Posts from "../../src/components/blog/posts/index";
import {handleRedirectsAndReturnData} from "../../src/utils/slugs";
import {GET_POSTS} from "../../src/queries/posts/GET_POSTS";

const Blog = ({ data }) => {
    console.log('data',data)
    const pagesCount = totalPagesCount(data?.posts?.pageInfo?.offsetPagination?.total ?? 0);
    return (
        <Layout data={data}>
            hello
           <Posts posts={data?.posts?.edges ?? []}/>
           { /**   <Pagination pagesCount={pagesCount} postName="blog" />*/}  
      </Layout>
    );
};

export default Blog;

export async function getStaticProps() {
    const { data, errors } = await client.query({
        query: GET_POSTS,
        variables: {
            uri: '/blog',
            perPage: 7,
            offset:5,
        },
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

    return handleRedirectsAndReturnData( defaultProps, data, errors, 'posts' );
}