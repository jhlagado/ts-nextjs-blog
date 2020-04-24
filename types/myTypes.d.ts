/* myTypes.d.ts */

export interface PostId {
  id: string;
}

export interface PostContent {
  id: string;
  contentHtml: string;
}

export interface PostData {
  id?: string;
  title: string;
  date: string;
  contentHtml?: string;
}

export interface PostParams {
  params: PostId;
}
