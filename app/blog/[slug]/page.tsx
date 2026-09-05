import Nav from '@/components/nav';
import { getPostBySlug } from '@/lib/wp-api';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({
  params,
}: PageProps) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);
  
  if (!post) {
    return (
      <>
        <Nav />

        <h1>Post Not Found</h1>
      </>
    );
  }

  return (
    <>
      <Nav />

      <article>
        <h1>{post.title.rendered}</h1>

        <p>
          Published:{' '}
          {new Date(post.date).toLocaleDateString()}
        </p>

        <div
          dangerouslySetInnerHTML={{
            __html: post.content.rendered,
          }}
        />
      </article>
    </>
  );
}