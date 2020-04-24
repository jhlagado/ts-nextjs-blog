import Head from "next/head";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";

/**
 *
 * @export
 * @typedef { import('../../types/myTypes').PostId } PostId
 * @typedef { import('../../types/myTypes').PostParams } PostParams
 * @typedef { import('../../types/myTypes').PostData } PostData
 * @returns
 */

/**
 *
 *
 * @export
 * @param {{ postData: PostData }} props
 */
export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

/**
 *
 * @param {PostParams} postParams
 */
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

/**
 * @export
 * @returns {Promise<{ paths:PostParams[], fallback:boolean}>}
 */
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}
