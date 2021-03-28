import Header from "../layout/header/Header"
import Footer from './Footer'
import Head from 'next/head'
import SvgInstagram from "../../icons/SvgInstagram"
import Seo  from './SEO'
import {isEmpty} from 'lodash';
import {sanitize} from "../../utils/miscellanous";
import PropTypes from 'prop-types';

const Layout = ({data, isPost, children}) => {
    const {page, post, header, footer, headerMenus, footerMenus} = data || {};

    // If it does not have either post or page.
    if (isEmpty(page) && isEmpty(post)) {
        return null
    }

    const seo = isPost ? (post?.seo ?? {}) : (page?.seo ?? {});
    const uri = isPost ? (post?.uri ?? {}) : (page?.uri ?? {});

    return (
        <div className="">
            <Seo seo={seo} uri={uri}/>
            <Head>
                <link rel="shortcut icon" href={header?.favicon}/>
                {seo?.schemaDetails ? (
                    <script
                        type='application/ld+json'
                        className='yoast-schema-graph'
                        key='yoastSchema'
                        dangerouslySetInnerHTML={{__html: sanitize(seo.schemaDetails)}}
                    />
                ) : null}
            </Head>
            <Header header={header} headerMenus={headerMenus?.edges}/>
            <div className="h-almost-screen">
                {children}
            </div>
            <Footer  footer={footer} footerMenus={footerMenus?.edges}/>
        </div>
    )
}

Layout.propTypes = {
    data: PropTypes.object,
    isPost: PropTypes.bool,
    children: PropTypes.object
}

Layout.defaultProps = {
    data: {},
    isPost: false,
    children: {}
}

export default Layout















