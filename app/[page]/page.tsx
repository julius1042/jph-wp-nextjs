const WORDPRESS_HOME_URL=process.env.WORDPRESS_HOME_URL
import { getPageDataBySlug } from '@/lib/wp-api'
import Nav from '@/components/nav'

type Props = {
    params: Promise<{
    page: string;
  }>;
};

const Pages = async ({ params }: Props) => {
  const { page } = await params;
  const pageResult = await getPageDataBySlug(page);

  

  if (!pageResult) {
    return <div>Page not found</div>;
  }

  return (
    <main>
      <Nav />
      <h1>{pageResult.title.rendered}</h1>

      <div
        dangerouslySetInnerHTML={{
          __html: pageResult.content.rendered,
        }}
      />
    </main>
  );
};

export default Pages;


      