
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "../../../lib/api";
import { CMS_NAME } from "../../../lib/constants";
import markdownToHtml from "../../../lib/markdownToHtml";
import Container from "../../../components/container";
import Header from "../../../components/header";
import { PostBody } from "../../../components/post-body";
import { PostHeader } from "../../../components/post-header";

export default async function Post({ params } ) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <main> 
      <Container>
        <Header />
        <article className="mb-32">
          <PostHeader
            title={post?.title}
            coverImage={post?.coverImage}
            date={post?.date}
            author={post.author}
          />
          <PostBody content={content} />
        </article>
      </Container>
    </main>
  );
}

 
export function generateMetadata({ params } ) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Next.js Blog Example with  `;

  return {
    title,
    openGraph: {
      title,
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
