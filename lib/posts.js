import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";

/**
 *   @typedef {import('../types/myTypes').PostId} PostId
 *   @typedef {import('../types/myTypes').PostId} PostContent
 *   @typedef {import('../types/myTypes').PostData} PostData
 */

const postsDirectory = path.join(process.cwd(), "posts");

/**
 *   @returns {PostData[]}
 */
export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section

    const { title, date } = matter(fileContents).data;

    // Combine the data with the id
    return {
      id,
      title,
      date,
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

/**
 * @export
 * @returns {{ params: PostId }[]}
 */
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

/**
 *
 * @export
 * @param {string} id
 * @returns { Promise<PostData> }
 */
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)
  const { title, date } = matterResult.data;

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    // @ts-ignore
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    title,
    date,
  };
}
